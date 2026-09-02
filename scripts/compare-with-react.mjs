/* eslint-disable no-undef */
/**
 * Compares every Vue component against its React counterpart and against the
 * CSS that ships with it, then prints what does not line up.
 *
 * Three checks, all static, so this runs in a second and needs no browser:
 *
 * 1. slot-parity   — data-slot names React emits that Vue never does. These are
 *                    the public hooks consumers and our own CSS select on.
 * 2. dead-css      — data-slot names the stylesheet selects on that nothing
 *                    emits, so those rules can never match.
 * 3. part-parity   — dot-notation parts React exports that the Vue namespace
 *                    lacks, which is what makes a React demo untranslatable.
 *
 * A fourth check — variant slots declared but never read — was tried and
 * removed: the access path varies too much (`slots.value.x()`, `styles.value.x()`,
 * `ctx?.slots.x()`, or a sibling directory consuming it through context) for a
 * regex to tell a real miss from a different spelling. It reported 27 of 81
 * components, all of which turned out to be styled correctly.
 *
 * Complements `apps/docs/scripts/audit-demos.mjs`, which catches the layout
 * problems this cannot see. Neither replaces the other: this reads source and
 * finds contract drift, that one measures a real browser and finds collapse.
 *
 * Usage:
 *   pnpm compare              # whole library
 *   pnpm compare toast        # one component
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const VUE = join(ROOT, 'packages/vue/src/components')
const REACT = join(ROOT, 'react-source/heroui/packages/react/src/components')
const STYLES = join(ROOT, 'packages/styles/src/components')

const only = process.argv[2]

/** Every file under dir, recursively. */
const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((entry) => {
        const path = join(dir, entry)
        return statSync(path).isDirectory() ? walk(path) : [path]
      })
    : []

const readAll = (dir, filter) =>
  walk(dir)
    .filter(filter)
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n')

const slotsIn = (text) => {
  const slots = new Set([...text.matchAll(/data-slot="([a-z0-9-]+)"/g)].map((m) => m[1]))
  // Calendar's parts derive their slot from a prefix the calendar sets, so the
  // literal name never appears. Both prefixes are reachable: a plain Calendar
  // uses "calendar", a RangeCalendar sets "range-calendar".
  for (const match of text.matchAll(/calendarSlotName\(\s*\w+\s*,\s*'([a-z0-9-]+)'/g)) {
    slots.add(`calendar-${match[1]}`)
    slots.add(`range-calendar-${match[1]}`)
  }
  // Parts that swap their slot depending on whether the caller supplied custom
  // content bind it as an expression: `hasCustom ? 'x' : 'x-default'`.
  for (const match of text.matchAll(/:data-slot="[^"]*?'([a-z0-9-]+)'\s*:\s*'([a-z0-9-]+)'/g)) {
    slots.add(match[1])
    slots.add(match[2])
  }
  return slots
}

/** Slots a stylesheet selects on, which must therefore be emitted by someone. */
const slotsSelectedBy = (text) =>
  new Set([...text.matchAll(/\[data-slot="([a-z0-9-]+)"\]/g)].map((match) => match[1]))

/** Keys of the Object.assign that builds a compound namespace. */
const partsIn = (text) => {
  const body = text.match(/Object\.assign\(\s*\w+\s*,\s*\{([\s\S]*?)\}\s*\)/)
  if (!body) return new Set()
  return new Set(
    [...body[1].matchAll(/^\s*([A-Z][A-Za-z]*)\s*:/gm)].map((match) => match[1]),
  )
}

const isSource = (path) => /\.(vue|ts|tsx)$/.test(path) && !/\.(test|stories|spec)\./.test(path)

// Vue folds several React components into one directory, and names a few
// differently. Only genuinely equivalent pairs belong here.
const REACT_DIRS = {
  calendar: ['calendar', 'calendar-year-picker'],
  'range-calendar': ['range-calendar', 'calendar-year-picker'],
  textfield: ['text-field'],
  textarea: ['text-area'],
}

const components = (only ? [only] : readdirSync(VUE)).filter((name) =>
  statSync(join(VUE, name)).isDirectory(),
)

// Scanned once: every slot the library emits anywhere.
const librarySlots = slotsIn(readAll(VUE, isSource))

const findings = []

for (const name of components) {
  const vueText = readAll(join(VUE, name), isSource)
  if (!vueText.trim()) continue

  const reactDirs = REACT_DIRS[name] ?? [name]
  const reactText = reactDirs.map((dir) => readAll(join(REACT, dir), isSource)).join('\n')

  const vueSlots = slotsIn(vueText)
  const finding = { deadCss: [], missingParts: [], missingSlots: [], name }

  if (reactText.trim()) {
    for (const slot of slotsIn(reactText)) {
      if (!vueSlots.has(slot) && !librarySlots.has(slot)) finding.missingSlots.push(slot)
    }

    const vueParts = partsIn(vueText)
    const reactParts = partsIn(reactText)
    // React's index.ts also assigns Root; only flag real parts.
    for (const part of reactParts) {
      if (part !== 'Root' && !vueParts.has(part)) finding.missingParts.push(part)
    }
  }

  // Stylesheets may live at components/<name>.css or components/<name>/*.css.
  const cssPaths = [
    join(STYLES, `${name}.css`),
    ...walk(join(STYLES, name)).filter((path) => path.endsWith('.css')),
  ].filter((path) => existsSync(path))

  if (cssPaths.length) {
    const css = cssPaths.map((path) => readFileSync(path, 'utf8')).join('\n')
    // A stylesheet may legitimately select a slot another component emits
    // (toast styles the spinner it embeds), so check against the whole library.
    for (const slot of slotsSelectedBy(css)) {
      if (!librarySlots.has(slot)) finding.deadCss.push(slot)
    }
  }

  if (finding.missingSlots.length || finding.missingParts.length || finding.deadCss.length) {
    findings.push(finding)
  }
}

if (findings.length === 0) {
  console.log(`No mismatches across ${components.length} components.`)
} else {
  console.log(`${findings.length} of ${components.length} components have mismatches:\n`)
  for (const finding of findings) {
    console.log(`── ${finding.name}`)
    if (finding.missingSlots.length) {
      console.log(`   react emits, vue does not: ${finding.missingSlots.join(', ')}`)
    }
    if (finding.missingParts.length) {
      console.log(`   react parts missing: ${finding.missingParts.join(', ')}`)
    }
    if (finding.deadCss.length) {
      console.log(`   css selects nothing: ${finding.deadCss.join(', ')}`)
    }
  }
  process.exitCode = 1
}
