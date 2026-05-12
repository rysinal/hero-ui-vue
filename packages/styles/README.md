# @rysinal/heroui-vue-styles

Styles and CSS entrypoints for `@rysinal/heroui-vue`.

Most users should not use this package by itself. Install it together with the Vue component package:

```bash
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

## Usage

Import the global styles once in your app entry file:

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

Advanced users can also import variant helpers directly:

```ts
import { buttonVariants } from '@rysinal/heroui-vue-styles'
```

## Links

- Documentation: https://hero-ui-vue.pages.dev
- Repository: https://github.com/rysinal/hero-ui-vue
- Issues: https://github.com/rysinal/hero-ui-vue/issues

## License

Apache-2.0
