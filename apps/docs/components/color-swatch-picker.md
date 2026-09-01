# ColorSwatchPicker

A grid of colours to choose from.

## Import

```ts
import { ColorSwatchPicker } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/color-swatch-picker-basic.vue

:::

## Default Value

:::preview

demo-preview=../demos/color-swatch-picker-default-value.vue

:::

## Controlled

:::preview

demo-preview=../demos/color-swatch-picker-controlled.vue

:::

## Sizes

:::preview

demo-preview=../demos/color-swatch-picker-sizes.vue

:::

## Variants

:::preview

demo-preview=../demos/color-swatch-picker-variants.vue

:::

## Stack Layout

:::preview

demo-preview=../demos/color-swatch-picker-stack-layout.vue

:::

## Custom Indicator

:::preview

demo-preview=../demos/color-swatch-picker-custom-indicator.vue

:::

## Disabled

:::preview

demo-preview=../demos/color-swatch-picker-disabled.vue

:::

## Reading the Selection

:::preview

demo-preview=../demos/color-swatch-picker-custom-render-function.vue

:::

## API

### ColorSwatchPicker

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| Color \| null` | `undefined` | Selected colour. Supports `v-model` |
| `defaultValue` | `string \| Color \| null` | `null` | Initial selection |
| `layout` | `'grid' \| 'stack'` | `'grid'` | How the swatches are arranged |
| `variant` | `'circle' \| 'square'` | `'circle'` | Swatch shape |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Swatch size |
| `isDisabled` | `boolean` | `false` | Disables every swatch |

Selection is compared by CSS string, so two `Color` values for the same colour
match.

### ColorSwatchPicker.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string \| Color` | — | The colour this item offers |
| `isDisabled` | `boolean` | `false` | Disables this item |

### ColorSwatchPicker.Swatch / ColorSwatchPicker.Indicator

The indicator renders only on the selected item.

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

