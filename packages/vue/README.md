# @rysinal/heroui-vue

Beautiful and modern Vue 3 UI components inspired by HeroUI, built with Tailwind CSS 4.

Documentation: https://hero-ui-vue.pages.dev

> Work in progress: this package is still under active development and is not ready for production use.

## Installation

Install the Vue components and the companion styles package:

```bash
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

## Setup

Import the styles once in your application entry:

```ts
import '@rysinal/heroui-vue-styles/styles.css'
```

For Tailwind CSS 4, include the package in your CSS source scan:

```css
@import "tailwindcss";
@source "../node_modules/@rysinal/heroui-vue";
```

## Quick Start

```vue
<script setup lang="ts">
import { Button } from '@rysinal/heroui-vue'
</script>

<template>
  <Button variant="primary">Click me</Button>
</template>
```

## Packages

- `@rysinal/heroui-vue`: Vue 3 component library.
- `@rysinal/heroui-vue-styles`: shared styles, Tailwind variants, and CSS entrypoints.

## Links

- Documentation: https://hero-ui-vue.pages.dev
- Repository: https://github.com/rysinal/hero-ui-vue
- Issues: https://github.com/rysinal/hero-ui-vue/issues

## License

Apache-2.0
