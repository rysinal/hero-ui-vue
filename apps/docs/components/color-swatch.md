# ColorSwatch

A preview of a single colour.

## Import

```ts
import { ColorSwatch } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/color-swatch-basic.vue

:::

## Sizes

:::preview

demo-preview=../demos/color-swatch-sizes.vue

:::

## Shapes

:::preview

demo-preview=../demos/color-swatch-shapes.vue

:::

## Transparency

:::preview

demo-preview=../demos/color-swatch-transparency.vue

:::

## Custom Styles

:::preview

demo-preview=../demos/color-swatch-custom-styles.vue

:::

## Accessibility

:::preview

demo-preview=../demos/color-swatch-accessibility.vue

:::

## Custom Content

:::preview

demo-preview=../demos/color-swatch-custom-render-function.vue

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string \| Color` | — | The colour to show |
| `shape` | `'circle' \| 'square'` | `'circle'` | Swatch shape |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Swatch size |
| `class` | `string` | `undefined` | Additional classes |

A translucent colour shows the checkerboard behind it.

### Working with colours

`parseColor` accepts hex, `rgb`/`rgba`, `hsl`/`hsla` and `hsb`. A `Color` is
immutable: `withChannelValue` returns a new one.

```ts
import { parseColor } from '@rysinal/heroui-vue'

const color = parseColor('hsl(200, 100%, 50%)')
color.getChannelValue('hue')          // 200
color.withChannelValue('hue', 210)    // a new Color
color.toString('hex')                 // '#0084ff'
```

Hold a `Color` in `shallowRef` rather than `ref`: it is immutable, so deep
reactivity buys nothing.

