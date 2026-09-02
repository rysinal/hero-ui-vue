# Demo audit

`pnpm audit:demos` walks every component docs page in a real browser and reports
demos whose rendered geometry has collapsed, plus page errors.

```bash
# Serve the docs first, either is fine:
pnpm --filter @rysinal/heroui-vue-docs dev
# or, to check what ships:
pnpm --filter @rysinal/heroui-vue-docs build
pnpm --filter @rysinal/heroui-vue-docs preview

pnpm --filter @rysinal/heroui-vue-docs audit:demos
```

## Why this exists

Unit tests run in jsdom, which parses CSS but never lays anything out, so
`getBoundingClientRect()` is always zero there. Two real defects therefore
passed the whole suite, typecheck and the docs build while being obvious on
screen:

- The calendar grid is a `<table>` whose CSS re-lays it out as a grid. VitePress
  and the docs theme both style `.vp-doc table`, landing at the same specificity
  and winning on order, so the grid stayed a table and each day cell inherited
  the table's full width — 250px squares instead of 56px.
- The markdown renderer wraps a demo's root in a `<p>`, which shrink-wraps
  inside the centred flex preview. Components sized with `w-full` resolved
  against a collapsed parent, so ColorArea rendered 16px square.

Both are layout-only, which is precisely the class of bug the rest of the
pipeline cannot see.

## Options

| Variable | Effect |
| --- | --- |
| `AUDIT_BASE` | Origin to audit. Defaults to `http://localhost:5173`. |
| `AUDIT_CDP` | Attach to a running Chrome's DevTools endpoint instead of launching one. |
| `AUDIT_CHANNEL` | Browser channel to launch. Defaults to `chrome`, avoiding `playwright install`. |
| `AUDIT_HYDRATION` | Also report hydration mismatches. Off by default: every prerendered page reports one, including on commits predating this work, so it carries no per-demo signal. |

`audit-pages.txt` lists the pages to visit, one slug per line. Regenerate it with:

```bash
ls apps/docs/components/*.md | sed 's|.*/||;s|\.md||' | grep -v '^index$' \
  > apps/docs/scripts/audit-pages.txt
```
