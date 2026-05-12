# @rysinal/heroui-vue-styles

Styles and CSS entrypoints for `@rysinal/heroui-vue`.

Most users should not use this package by itself. Install it together with the Vue component package:

```bash
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

```bash
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
```

## Usage

Add to your main CSS file, for example `src/style.css`:

```css
@import "tailwindcss";
@import "@rysinal/heroui-vue-styles/styles.css";
```

Import order matters. Always import `tailwindcss` first.

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
