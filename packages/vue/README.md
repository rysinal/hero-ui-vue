# @rysinal/heroui-vue

Beautiful and modern Vue 3 UI components inspired by HeroUI, built with Tailwind CSS 4.

Documentation: https://hero-ui-vue.pages.dev

> Work in progress: this package is still under active development and is not ready for production use.

## Installation

HeroUI Vue is currently designed for Vue 3 projects that use Tailwind CSS 4.

Install the Vue components and the required styles package:

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

Import the styles once in your application entry file:

```ts
// src/main.ts
import { createApp } from 'vue'
import '@rysinal/heroui-vue-styles/styles.css'
import App from './App.vue'

createApp(App).mount('#app')
```

Tell Tailwind CSS 4 to scan the HeroUI Vue package. Put this in your main CSS file, usually `src/style.css` or `src/assets/main.css`:

```css
@import "tailwindcss";
@source "../node_modules/@rysinal/heroui-vue";
```

The `@source` line is needed because Tailwind does not scan component code inside `node_modules` by default. If your CSS file is nested deeper than `src/style.css`, adjust the `../node_modules` path.

## Quick Start

Use your first component in any Vue file:

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
