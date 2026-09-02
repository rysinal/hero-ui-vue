/* eslint-disable no-undef */
// Walks every component docs page in a real browser and reports demos whose
// rendered geometry has collapsed, plus any console errors. Demos render on the
// client, so the built HTML cannot show this — only a live page can.
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const pages = readFileSync(new URL('./audit-pages.txt', import.meta.url), 'utf8')
  .trim()
  .split('\n')
  .filter(Boolean)

const BASE = process.env.AUDIT_BASE ?? 'http://localhost:5173'

// Prefer an already-running Chrome over Playwright's own download. Point
// AUDIT_CDP at its DevTools endpoint, or set AUDIT_CHANNEL to use a local
// install (`chrome`), which avoids `playwright install` entirely.
const browser = process.env.AUDIT_CDP
  ? await chromium.connectOverCDP(process.env.AUDIT_CDP)
  : await chromium.launch({ channel: process.env.AUDIT_CHANNEL ?? 'chrome' })

const context = browser.contexts()[0] ?? (await browser.newContext())
const page = await context.newPage()
await page.setViewportSize({ height: 1200, width: 1440 })

const findings = []

for (const name of pages) {
  const consoleErrors = []
  const onConsole = (msg) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    // Missing favicon and similar shell noise is not a component problem.
    if (/favicon|net::ERR_/.test(text)) return
    // Every prerendered page reports this, including on commits that predate
    // any of the component work, so it tells us nothing about a given demo.
    // Set AUDIT_HYDRATION=1 to see them.
    if (!process.env.AUDIT_HYDRATION && /Hydration completed but contains mismatches/.test(text)) return
    consoleErrors.push(text.slice(0, 160))
  }
  page.on('console', onConsole)
  const pageErrors = []
  const onPageError = (err) => pageErrors.push(String(err.message).slice(0, 160))
  page.on('pageerror', onPageError)

  await page.goto(`${BASE}/components/${name}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)

  const report = await page.evaluate(() => {
    const result = { collapsed: [], emptyPreviews: 0, roots: 0 }
    const previews = [...document.querySelectorAll('.vitepress-demo-preview-preview')]

    previews.forEach((preview, index) => {
      // Demos vary in depth and some wrap their root in a plain div, so look for
      // every slotted element rather than only the direct children.
      const roots = [...preview.querySelectorAll('[data-slot]')]
      const rect = preview.getBoundingClientRect()
      // A preview that rendered nothing has no slotted element and no box of its
      // own. Text is not a signal: Skeleton and Spinner are legitimately empty.
      if (roots.length === 0 && rect.height < 40) {
        result.emptyPreviews += 1
      }
      roots.forEach((element) => {
        result.roots += 1
        const bounds = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        if (style.display === 'none' || style.visibility === 'hidden') return
        // Deliberately invisible: the OTP field keeps a transparent input over
        // its slots to capture typing.
        if (Number(style.opacity) === 0) return
        // Overlay contents (popovers, dialogs) are closed until interacted with.
        if (element.closest('[role="dialog"], [data-state="closed"]')) return
        // Screen-reader-only text is clipped away on purpose.
        if (style.clipPath?.startsWith('inset(50%')) return
        const slot = element.getAttribute('data-slot')
        // Plenty of parts are legitimately hairline-thin: separators, indicator
        // bars and the literal "/" between date segments. Checkmarks are sized
        // as a fraction of their swatch, so a small one is correct. Only flag a
        // part that should occupy real space in both directions.
        const thinByDesign =
          /separator|indicator|checkmark/.test(slot ?? '') || element.dataset.type === 'literal'
        if (thinByDesign) return
        if (bounds.width > 0 && bounds.width < 8) {
          result.collapsed.push({ demo: index, height: Math.round(bounds.height), slot, width: Math.round(bounds.width) })
        } else if (bounds.height > 0 && bounds.height < 4) {
          result.collapsed.push({ demo: index, height: Math.round(bounds.height), slot, width: Math.round(bounds.width) })
        }
      })
    })

    return result
  })

  page.off('console', onConsole)
  page.off('pageerror', onPageError)

  if (report.collapsed.length || report.emptyPreviews || consoleErrors.length || pageErrors.length) {
    findings.push({ ...report, consoleErrors, name, pageErrors })
  }
  process.stdout.write(`${report.collapsed.length || consoleErrors.length || pageErrors.length ? 'x' : '.'}`)
}

await page.close()
if (!process.env.AUDIT_CDP) await browser.close()

console.log('\n')
if (findings.length === 0) {
  console.log(`All ${pages.length} pages clean.`)
} else {
  console.log(`${findings.length} of ${pages.length} pages have findings:\n`)
  for (const finding of findings) {
    console.log(`── ${finding.name}`)
    if (finding.collapsed.length) {
      const summary = finding.collapsed
        .slice(0, 6)
        .map((c) => `${c.slot} ${c.width}x${c.height}`)
        .join(', ')
      console.log(`   collapsed (${finding.collapsed.length}): ${summary}`)
    }
    if (finding.emptyPreviews) console.log(`   empty previews: ${finding.emptyPreviews}`)
    finding.pageErrors.slice(0, 2).forEach((e) => console.log(`   pageerror: ${e}`))
    finding.consoleErrors.slice(0, 2).forEach((e) => console.log(`   console: ${e}`))
  }
  process.exitCode = 1
}
