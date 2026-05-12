# Installation

## Requirements

- Vue 3.4+
- Tailwind CSS 4+

## Quick Install

Install HeroUI Vue and required styles:

::: code-group

```bash [npm]
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash [pnpm]
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash [yarn]
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

:::

## Import Styles

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

## Use Components

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
