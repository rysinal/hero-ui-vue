# @rysinal/heroui-vue-styles

Styles and CSS entrypoints for `@rysinal/heroui-vue`.

Most users should not use this package by itself. Install it together with the Vue component package:

```bash
npm install @rysinal/heroui-vue @rysinal/heroui-vue-styles
npm install -D tailwindcss @tailwindcss/vite
```

```bash
pnpm add @rysinal/heroui-vue @rysinal/heroui-vue-styles
pnpm add -D tailwindcss @tailwindcss/vite
```

```bash
yarn add @rysinal/heroui-vue @rysinal/heroui-vue-styles
yarn add -D tailwindcss @tailwindcss/vite
```

## Usage

If Tailwind CSS 4 is already configured in your app, keep your existing setup.
For a Vite app, add the Tailwind plugin:

```ts
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), vue()],
})
```

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
