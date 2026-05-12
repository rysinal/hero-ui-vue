# @rysinal/heroui-vue

Beautiful and modern Vue 3 UI components inspired by HeroUI, built with Tailwind CSS 4.

Documentation: https://hero-ui-vue.pages.dev

> Work in progress: this package is still under active development and is not ready for production use.

## Quick Start

Get started with HeroUI Vue in minutes.

### Requirements

- Vue 3.4+
- Tailwind CSS v4

### Quick Install

Install HeroUI Vue and required styles:

```bash
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
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
import { Button } from '@rysinal/heroui-vue'
</script>

<template>
  <Button variant="primary">Click me</Button>
</template>
```

### What's Next?

- Documentation: https://hero-ui-vue.pages.dev
- Components: https://hero-ui-vue.pages.dev/components/

## Packages

- `@rysinal/heroui-vue`: Vue 3 component library.
- `@rysinal/heroui-vue-styles`: shared styles, Tailwind variants, and CSS entrypoints.

## Links

- Documentation: https://hero-ui-vue.pages.dev
- Repository: https://github.com/rysinal/hero-ui-vue
- Issues: https://github.com/rysinal/hero-ui-vue/issues

## License

Apache-2.0
