/* eslint-disable no-undef */
/**
 * Compares every Vue component against its React counterpart and against the
 * CSS that ships with it, then prints what does not line up.
 *
 * Four checks, all static, so this runs in a second and needs no browser:
 *
 * 1. slot-parity   — data-slot names React emits that Vue never does. These are
 *                    the public hooks consumers and our own CSS select on.
 * 2. dead-css      — data-slot names the stylesheet selects on that nothing
 *                    emits, so those rules can never match.
 * 3. part-parity   — dot-notation parts React exports that the Vue namespace
 *                    lacks, which is what makes a React demo untranslatable.
 * 4. prop-parity   — props React declares that Vue does not. Advisory: props
 *                    inherited from a primitive are invisible to a regex, so
 *                    treat a hit as a prompt to look, not as proof.
 *
 * A fifth check — variant slots declared but never read — was tried and
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

/**
 * ARIA roles a component sets. These are accessibility contract: a listbox that
 * forgets role="listbox" reads as a plain div to a screen reader.
 */
const rolesIn = (text) => {
  const roles = new Set([...text.matchAll(/\brole="([a-z]+)"/g)].map((match) => match[1]))
  // A native element carries its role implicitly, so <nav> needs no
  // role="navigation". React spells it out on the same element anyway.
  for (const [tag, role] of Object.entries(IMPLICIT_ROLES)) {
    if (new RegExp(`<${tag}[\\s>]`).test(text)) roles.add(role)
  }
  return roles
}

/**
 * States whose CSS is dead on *both* sides, because neither React nor this port
 * implements the interaction that sets them.
 *
 * React's table rows would get these from react-aria's drag-and-drop hooks, but
 * HeroUI never wires them up — there is no useDragAndDrop in its table and no
 * story for dragging a row — so there is nothing to port.
 *
 * Keyed by component and attribute deliberately. Deriving this from a regex over
 * the Vue source is circular: the identifier it would look for lives in the very
 * code that is missing, so an unimplemented state looks the same as an
 * inapplicable one and every case gets skipped. Anything absent from this list
 * is reported, which is what makes a genuinely dead rule visible.
 */
const DEAD_ON_BOTH_SIDES = {
  table: ['dragging', 'drop-target'],
}

/**
 * States set on an ancestor rather than by any component. Dark mode is applied
 * to <html> as `[data-theme="dark"]` — React documents the same contract — so a
 * component selecting on it from a descendant rule is correct, not dead.
 */
const AMBIENT_STATES = new Set(['theme'])

/** Roles a native element already conveys without the attribute. */
const IMPLICIT_ROLES = {
  nav: 'navigation',
  main: 'main',
  table: 'table',
  dialog: 'dialog',
  ul: 'list',
  ol: 'list',
  li: 'listitem',
}

/**
 * State attributes other than data-slot. Stylesheets and consumers both key off
 * these, so a missing one silently disables whatever styling depends on it.
 */
const stateAttrsIn = (text) => {
  const attrs = new Set()
  for (const match of text.matchAll(/\bdata-([a-z-]+)\s*=/g)) {
    if (match[1] !== 'slot') attrs.add(match[1])
  }
  // useInteractionStates hands these out as one object that components spread
  // with v-bind, so the literal names never appear at the call site.
  if (/v-bind="interactionAttrs"/.test(text)) {
    for (const name of ['focus-visible', 'focused', 'hovered', 'pressed']) attrs.add(name)
  }
  return attrs
}

/**
 * State attributes a stylesheet selects on with an actual declaration behind
 * them. Empty placeholder rules — `&[data-focus="true"] { }`, of which the
 * stylesheets have a few — style nothing, so an unset attribute there is not a
 * defect worth reporting.
 *
 * The body has to be read by counting braces rather than matched with a regex:
 * these rules nest (slider's dragging rule contains an `&::after`), and a
 * brace-free body pattern silently skips every rule that does, which is exactly
 * where the interesting states live.
 */
const stateAttrsSelectedBy = (text) => {
  const attrs = new Set()
  for (const match of text.matchAll(/\[data-([a-z-]+)[~^$*]?=[^\]]*\]([^{;}]*)\{/g)) {
    if (match[1] === 'slot') continue
    // Walk from the opening brace to its partner, so nested blocks are included.
    const open = match.index + match[0].length
    let depth = 1
    let index = open
    while (index < text.length && depth > 0) {
      if (text[index] === '{') depth += 1
      else if (text[index] === '}') depth -= 1
      index += 1
    }
    if (text.slice(open, index - 1).trim() === '') continue
    attrs.add(match[1])
  }
  return attrs
}

/** Slots a stylesheet selects on, which must therefore be emitted by someone. */
const slotsSelectedBy = (text) =>
  new Set([...text.matchAll(/\[data-slot="([a-z0-9-]+)"\]/g)].map((match) => match[1]))

/**
 * Nested rules whose selector repeats `&` as a descendant of itself, which
 * compiles to `.x .x` and can never match. Upstream has one such typo — the
 * light-swatch checkmark rule — and it silently disabled the styling while the
 * DOM attribute it keyed off looked perfectly correct, so nothing else caught it.
 *
 * Reported as a selector shape rather than compared against React, because
 * inheriting the same broken rule is not parity worth keeping.
 */
const selfNestedRules = (text) =>
  [...text.matchAll(/^[ \t]*(&[^{}\n]*\s&[^{}\n]*)\{/gm)].map((match) => match[1].trim())

/** Keys of the Object.assign that builds a compound namespace. */
const partsIn = (text) => {
  // Prettier wraps a long Object.assign onto its own lines, which leaves a
  // trailing comma after the closing brace, so that comma has to be optional.
  const body = text.match(/Object\.assign\(\s*\w+\s*,\s*\{([\s\S]*?)\}\s*,?\s*\)/)
  if (!body) return new Set()
  return new Set(
    [...body[1].matchAll(/^\s*([A-Z][A-Za-z]*)\s*:/gm)].map((match) => match[1]),
  )
}

/**
 * Prop names declared in any `interface ...Props { ... }` block, plus the events
 * a Vue component declares, since React passes callbacks as props where Vue
 * emits them: `onYearPickerOpenChange` is `yearPickerOpenChange` here.
 *
 * `...RenderProps` blocks are skipped: those describe what React passes *into*
 * a render callback, which Vue expresses as slot props, so they are never
 * component props. Props inherited from a primitive are invisible here, which is
 * why a React-only name is a prompt to look rather than proof of a gap.
 */
const propsIn = (text) => {
  const names = new Set()
  for (const block of text.matchAll(/interface\s+(\w*)Props\b[^{]*\{([\s\S]*?)\n\}/g)) {
    if (block[1].endsWith('Render')) continue
    for (const prop of block[2].matchAll(/^\s{2}([a-z][a-zA-Z0-9]*)\??\s*:/gm)) {
      names.add(prop[1])
    }
  }
  const emits = text.match(/defineEmits<\{([\s\S]*?)\}>\(\)/)
  if (emits) {
    for (const event of emits[1].matchAll(/^\s*'?([a-zA-Z:]+)'?\s*:/gm)) {
      const name = event[1].replace(/^update:/, '')
      names.add(name)
      // React spells the same thing onFooChange.
      names.add(`on${name[0].toUpperCase()}${name.slice(1)}`)
    }
  }
  return names
}

/** React-only concepts with a different shape in Vue, so never a real gap. */
const PROP_EQUIVALENTS = new Set([
  'children', // slots
  'className', // class
  'render', // slots
  'style',
  'slot',
  'ref',
  'key',
  'id',
  'asChild',
  'as',
  // A react-aria hook's return value, handed in so two components can share one
  // overlay. Vue shares that through provide/inject instead.
  'state',
  // React refs passed down as props. Vue components own their template refs.
  'containerRef',
  'triggerRef',
  'inputRef',
  // react-hook-form style validation payloads, surfaced through slots here.
  'validationErrors',
  'validationDetails',
  // React composes class names per element via extra props; Vue parts each take
  // their own `class`.
  'inputClassName',
])

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

// Scanned once: everything the library declares anywhere. A React folder can
// map to several Vue folders (the year picker lives beside the calendar), so a
// name found elsewhere in the library is not missing.
const libraryText = readAll(VUE, isSource)
const librarySlots = slotsIn(libraryText)
const libraryProps = propsIn(libraryText)
const libraryRoles = rolesIn(libraryText)
const libraryState = stateAttrsIn(libraryText)

const findings = []

for (const name of components) {
  const vueText = readAll(join(VUE, name), isSource)
  if (!vueText.trim()) continue

  const reactDirs = REACT_DIRS[name] ?? [name]
  const reactText = reactDirs.map((dir) => readAll(join(REACT, dir), isSource)).join('\n')

  const vueSlots = slotsIn(vueText)
  const finding = {
    deadCss: [],
    deadStateCss: [],
    unmatchableCss: [],
    missingParts: [],
    missingProps: [],
    missingRoles: [],
    missingSlots: [],
    missingState: [],
    name,
  }

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

    const vueProps = propsIn(vueText)
    for (const prop of propsIn(reactText)) {
      if (vueProps.has(prop) || libraryProps.has(prop) || PROP_EQUIVALENTS.has(prop)) continue
      finding.missingProps.push(prop)
    }

    const vueRoles = rolesIn(vueText)
    for (const role of rolesIn(reactText)) {
      if (!vueRoles.has(role) && !libraryRoles.has(role)) finding.missingRoles.push(role)
    }

    const vueState = stateAttrsIn(vueText)
    for (const attr of stateAttrsIn(reactText)) {
      if (!vueState.has(attr) && !libraryState.has(attr)) finding.missingState.push(attr)
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
    for (const attr of stateAttrsSelectedBy(css)) {
      if (libraryState.has(attr)) continue
      if (AMBIENT_STATES.has(attr)) continue
      if (DEAD_ON_BOTH_SIDES[name]?.includes(attr)) continue
      finding.deadStateCss.push(attr)
    }
    finding.unmatchableCss.push(...selfNestedRules(css))
  }

  if (
    finding.missingSlots.length ||
    finding.missingParts.length ||
    finding.missingProps.length ||
    finding.missingRoles.length ||
    finding.missingState.length ||
    finding.deadCss.length ||
    finding.deadStateCss.length ||
    finding.unmatchableCss.length
  ) {
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
    if (finding.missingRoles.length) {
      console.log(`   aria roles missing: ${finding.missingRoles.join(', ')}`)
    }
    if (finding.missingState.length) {
      console.log(`   state attrs missing: ${finding.missingState.map((a) => `data-${a}`).join(', ')}`)
    }
    if (finding.deadStateCss.length) {
      console.log(`   css selects unset state: ${finding.deadStateCss.map((a) => `data-${a}`).join(', ')}`)
    }
    if (finding.unmatchableCss.length) {
      console.log(`   css rule can never match: ${finding.unmatchableCss.join(' | ')}`)
    }
    if (finding.missingProps.length) {
      console.log(`   react props absent (check, may be inherited): ${finding.missingProps.join(', ')}`)
    }
  }
  process.exitCode = 1
}
