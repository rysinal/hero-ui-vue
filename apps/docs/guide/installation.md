# Installation

## Prerequisites

- Node.js 18+
- Vue 3.3+
- Tailwind CSS 4+

HeroUI Vue is currently designed for Vue 3 projects that already use Tailwind CSS 4.

## 1. Install Packages

Install both packages. The Vue package contains the components, and the styles package contains the CSS they need.

::: code-group

```bash [pnpm]
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash [npm]
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash [yarn]
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

:::

## 2. Import Styles

Import the HeroUI styles once in your app entry file:

```ts
// main.ts
import { createApp } from 'vue'
import '@rysinal/heroui-vue-styles/styles.css'
import App from './App.vue'

createApp(App).mount('#app')
```

## 3. Configure Tailwind CSS

Tell Tailwind CSS 4 to scan the HeroUI Vue package. Put this in your main CSS file, usually `src/style.css` or `src/assets/main.css`:

```css
@import "tailwindcss";
@source "../node_modules/@rysinal/heroui-vue";
```

The `@source` line is needed because Tailwind does not scan component code inside `node_modules` by default. If your CSS file is nested deeper than `src/style.css`, adjust the `../node_modules` path.

## 4. Use a Component

Use your first component in any Vue file:

```vue
<script setup lang="ts">
import { Button } from '@rysinal/heroui-vue'
</script>

<template>
  <Button variant="primary">Click me</Button>
</template>
```

## Next Steps

Continue to the [Quick Start](/guide/quick-start) guide to learn how to use HeroUI components.
