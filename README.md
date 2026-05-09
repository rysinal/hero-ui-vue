# HeroUI Vue

<p align="center">
  <img src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/heroui-og_2x.jpg" alt="HeroUI Vue" width="100%" />
</p>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/npm/l/@heroui-vue/vue?style=flat" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/@heroui-vue/vue">
    <img src="https://img.shields.io/npm/dm/@heroui-vue/vue.svg?style=flat-round" alt="npm downloads">
  </a>
</p>

**HeroUI Vue** is a beautiful and modern Vue 3 UI library - a complete port of HeroUI React to Vue 3 with Composition API.

> ⚠️ **Work in Progress**: This library is currently under active development. Not ready for production use.

## Features

- 🎨 **Beautiful by Default** - Stunning components out of the box
- 🎯 **Customizable by Design** - Easy to customize with Tailwind CSS v4
- ♿ **Accessible** - Built on Radix Vue primitives with full ARIA support
- 🔧 **TypeScript** - Full TypeScript support with strict types
- 🚀 **Modern** - Vue 3 Composition API
- 📦 **Tree-shakeable** - Import only what you need
- 🎭 **Compound Components** - Flexible composition patterns

## Installation

```bash
# pnpm
pnpm add @heroui-vue/vue

# npm
npm install @heroui-vue/vue

# yarn
yarn add @heroui-vue/vue
```

## Quick Start

```vue
<script setup lang="ts">
import { Button } from '@heroui-vue/vue';
</script>

<template>
  <Button variant="primary">Click me</Button>
</template>
```

## Documentation

Visit [documentation site](https://heroui-vue.com) (coming soon) for full documentation.

## Components

### Foundation (10)
Button, Link, Text, Label, Description, FieldError, Spinner, Separator, Kbd, CloseButton

### Forms (15)
TextField, TextArea, Input, InputGroup, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, SwitchGroup, Select, ComboBox, Autocomplete, SearchField, NumberField

### Layout & Navigation (12)
Accordion, Tabs, Disclosure, DisclosureGroup, Breadcrumbs, Pagination, Toolbar, Card, Surface, Fieldset, Form, ScrollShadow

### Overlays (8)
Popover, Tooltip, Modal, Drawer, AlertDialog, Dropdown, Menu, ListBox

### Data Display (12)
Avatar, Badge, Chip, Tag, TagGroup, Table, Skeleton, ProgressBar, ProgressCircle, Meter, EmptyState, Header

### Date & Time (8)
Calendar, RangeCalendar, DateField, DatePicker, DateRangePicker, TimeField, DateInputGroup, CalendarYearPicker

### Color (6)
ColorPicker, ColorArea, ColorSlider, ColorField, ColorSwatch, ColorSwatchPicker

### Advanced (9)
Slider, ToggleButton, ToggleButtonGroup, ButtonGroup, InputOTP, Toast, Alert, MenuSection, ListBoxSection

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
