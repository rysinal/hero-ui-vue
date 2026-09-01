# ColorArea

A two-dimensional field for picking two colour channels at once.

## Import

```ts
import { ColorArea } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/color-area-basic.vue

:::

## Controlled

:::preview

demo-preview=../demos/color-area-controlled.vue

:::

## Channels

:::preview

demo-preview=../demos/color-area-space-and-channels.vue

:::

## With Dots

:::preview

demo-preview=../demos/color-area-with-dots.vue

:::

## Disabled

:::preview

demo-preview=../demos/color-area-disabled.vue

:::

## Reading the Value

:::preview

demo-preview=../demos/color-area-custom-render-function.vue

:::

## API

### ColorArea

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| Color` | `undefined` | Current colour. Supports `v-model` |
| `defaultValue` | `string \| Color` | `'rgb(255, 0, 0)'` | Initial colour |
| `xChannel` | `ColorChannel` | `'saturation'` | Channel on the horizontal axis |
| `yChannel` | `ColorChannel` | `'brightness'` | Channel on the vertical axis |
| `showDots` | `boolean` | `false` | Overlays a dot grid |
| `isDisabled` | `boolean` | `false` | Disables interaction |

Drag anywhere in the area, or focus the thumb and use the arrow keys.

### ColorArea.Thumb

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |

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

