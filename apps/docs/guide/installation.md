# Installation

## Prerequisites

- Node.js 18+ 
- Vue 3.3+
- Tailwind CSS 4+

## Package Manager

Install HeroUI Vue using your preferred package manager:

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

## Setup

### 1. Import Styles

Import the HeroUI styles in your main entry file:

```ts
// main.ts
import { createApp } from 'vue'
import '@rysinal/heroui-vue-styles/styles.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### 2. Configure Tailwind CSS v4

Add HeroUI to your CSS entry file:

```css
@import "tailwindcss";
@source "../node_modules/@rysinal/heroui-vue";
```

## Next Steps

Continue to the [Quick Start](/guide/quick-start) guide to learn how to use HeroUI components.
