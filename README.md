# HeroUI Vue

A Vue 3 port of [HeroUI](https://github.com/heroui-inc/heroui) — beautiful, accessible UI components built with Composition API, Radix Vue, and Tailwind CSS v4.

> **⚠️ Work in Progress** — actively under development, not yet production-ready.

## Project Structure

```
hero-ui-vue/
├── packages/
│   ├── vue/          # Component library source (@heroui-vue/vue)
│   ├── styles/       # CSS styles and BEM variants (@heroui-vue/styles)
│   └── standard/     # Shared TypeScript/ESLint configs
├── apps/
│   └── docs/         # VitePress documentation site
├── react-source/     # HeroUI React source — reference only, do not modify
└── .planning/        # Internal planning docs (gitignored)
```

## Development

```bash
# Install dependencies
pnpm install

# Start docs dev server (http://localhost:5173)
pnpm --filter docs dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

## Implemented Components (19)

**Foundation (10)**: Button, Link, Text, Label, Description, FieldError, Spinner, Separator, Kbd, CloseButton

**Forms (8)**: TextField, TextArea, Input, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch

**Compound (1)**: ButtonGroup

All components include full TypeScript types, accessibility features, and Tailwind CSS v4 styling.

## Reference

The `react-source/` directory contains the original HeroUI React source code and its docs site, used as the porting reference. See it for component API design, styling conventions, and accessibility patterns.

**Do not modify files in `react-source/`** — it's reference material only.

## Tech Stack

- [Vue 3](https://vuejs.org) + Composition API + TypeScript
- [Radix Vue](https://www.radix-vue.com) — accessible primitives
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [VitePress](https://vitepress.dev) — documentation site
- [pnpm workspaces](https://pnpm.io/workspaces) — monorepo

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

Apache-2.0 — see [LICENSE](LICENSE)
