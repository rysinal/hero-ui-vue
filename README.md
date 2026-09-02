# HeroUI Vue

<p align="center">
  <img src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/heroui-og_2x.jpg" alt="HeroUI Vue" width="100%" />
</p>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/npm/l/@rysinal/heroui-vue?style=flat" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/@rysinal/heroui-vue">
    <img src="https://img.shields.io/npm/dm/@rysinal/heroui-vue.svg?style=flat-round" alt="npm downloads">
  </a>
</p>

**HeroUI Vue** is a beautiful and modern Vue 3 UI library - a complete port of HeroUI React to Vue 3 with Composition API.

Documentation: [https://hero-ui-vue.pages.dev](https://hero-ui-vue.pages.dev)

> ⚠️ **Work in Progress**: This library is currently under active development. Not ready for production use.

## Features

- 🎨 **Beautiful by Default** - Stunning components out of the box
- 🎯 **Customizable by Design** - Easy to customize with Tailwind CSS v4
- ♿ **Accessible** - Built on Radix Vue primitives with full ARIA support
- 🔧 **TypeScript** - Full TypeScript support with strict types
- 🚀 **Modern** - Vue 3 Composition API
- 📦 **Tree-shakeable** - Import only what you need
- 🎭 **Compound Components** - Flexible composition patterns

## Quick Start

Get started with HeroUI Vue in minutes.

### Requirements

- Vue 3.4+
- Tailwind CSS v4

### Quick Install

Install HeroUI Vue and required styles:

```bash
# npm
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
npm install -D tailwindcss @tailwindcss/vite

# pnpm
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
pnpm add -D tailwindcss @tailwindcss/vite

# yarn
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
yarn add -D tailwindcss @tailwindcss/vite
```

If Tailwind CSS 4 is already configured in your app, keep your existing setup.
For a Vite app, add the Tailwind plugin:

```ts
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), vue()],
})
```

### Import Styles

Add to your main CSS file, for example `src/style.css`:

```css
@import "tailwindcss";
@import "@rysinal/heroui-vue-styles/styles.css";
```

Import order matters. Always import `tailwindcss` first.

If your app does not already load that CSS file, import it from `src/main.ts`:

```ts
import './style.css'
```

### Use Components

```vue
<script setup lang="ts">
import { Button } from '@rysinal/heroui-vue';
</script>

<template>
  <Button variant="primary">Click me</Button>
</template>
```

### What's Next?

- [Browse the documentation](https://hero-ui-vue.pages.dev)
- [Explore components](https://hero-ui-vue.pages.dev/components/)

## Documentation

Visit the [documentation site](https://hero-ui-vue.pages.dev) for full documentation.

## Component Coverage

Baseline: HeroUI React v3.0.4 docs list 71 React components. HeroUI Vue currently has docs-backed parity entries for 69 of those components, plus 5 additional Vue primitives used by the docs.

### React parity implemented (69/71)

Accordion, Alert, AlertDialog, Autocomplete, Avatar, Badge, Breadcrumbs, Button, ButtonGroup, Calendar, Card, Checkbox, CheckboxGroup, Chip, CloseButton, ColorArea, ColorField, ColorPicker, ColorSlider, ColorSwatch, ColorSwatchPicker, ComboBox, DateField, Description, Disclosure, DisclosureGroup, Drawer, Dropdown, ErrorMessage, FieldError, Fieldset, Form, Input, InputGroup, InputOTP, Kbd, Label, Link, ListBox, Meter, Modal, NumberField, Pagination, Popover, ProgressBar, ProgressCircle, RadioGroup, RangeCalendar, ScrollShadow, SearchField, Select, Separator, Skeleton, Slider, Spinner, Surface, Switch, Table, Tabs, TagGroup, Text, TextArea, TextField, TimeField, Toast, Toolbar, ToggleButton, ToggleButtonGroup, Tooltip.

### Additional Vue docs components

EmptyState, Header, Radio, SwitchGroup, Tag.

### Remaining React parity gaps (2)

DatePicker, DateRangePicker.

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Project Structure

```
hero-ui-vue/
├── packages/
│   ├── vue/          # Main component library
│   ├── styles/       # Tailwind CSS styles and variants
│   └── standard/     # Shared configurations
├── apps/
│   ├── docs/         # Documentation site
│   └── storybook/    # Component development
└── react-source/     # Original HeroUI React source
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Credits

This project is a Vue 3 port of [HeroUI](https://github.com/heroui-inc/heroui) by the HeroUI team.

## License

Apache-2.0 — see [LICENSE](LICENSE)

## Acknowledgments

- [HeroUI](https://heroui.com) - Original React component library
- [Radix Vue](https://www.radix-vue.com) - Accessible Vue primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Vue 3](https://vuejs.org) - Progressive JavaScript framework
