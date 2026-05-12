# @rysinal/heroui-vue-styles

Styles, Tailwind variants, and CSS entrypoints for `@rysinal/heroui-vue`.

Most users should install this package together with the Vue component package:

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

Import the global styles once in your app entry:

```ts
import '@rysinal/heroui-vue-styles/styles.css'
```

For Tailwind CSS 4, include the Vue package in your CSS source scan:

```css
@import "tailwindcss";
@source "../node_modules/@rysinal/heroui-vue";
```

The package also exposes compiled style utilities for advanced usage:

```ts
import { buttonVariants } from '@rysinal/heroui-vue-styles'
```

## Links

- Documentation: https://hero-ui-vue.pages.dev
- Repository: https://github.com/rysinal/hero-ui-vue
- Issues: https://github.com/rysinal/hero-ui-vue/issues

## License

Apache-2.0
