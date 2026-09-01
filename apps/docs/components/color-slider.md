# ColorSlider

A slider for one channel of a colour.

## Import

```ts
import { ColorSlider, Label } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/color-slider-basic.vue

:::

## Channels

:::preview

demo-preview=../demos/color-slider-channels.vue

:::

## RGB Channels

:::preview

demo-preview=../demos/color-slider-rgb-channels.vue

:::

## Alpha

:::preview

demo-preview=../demos/color-slider-alpha-channel.vue

:::

## Controlled

:::preview

demo-preview=../demos/color-slider-controlled.vue

:::

## Vertical

:::preview

demo-preview=../demos/color-slider-vertical.vue

:::

## Disabled

:::preview

demo-preview=../demos/color-slider-disabled.vue

:::

## Custom Output

:::preview

demo-preview=../demos/color-slider-custom-render-function.vue

:::

## API

### ColorSlider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| Color` | `undefined` | Current colour. Supports `v-model` |
| `defaultValue` | `string \| Color` | `'hsl(0, 100%, 50%)'` | Initial colour |
| `channel` | `ColorChannel` | `'hue'` | Channel this slider edits |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `isDisabled` | `boolean` | `false` | Disables interaction |

The track is painted with a gradient sampling the channel across its range, so
it always shows what the slider controls.

### ColorSlider.Output

Shows the channel value — `0°` for hue, `50%` for saturation. Override it
through the slot, which receives the whole colour.

### ColorSlider.Track / ColorSlider.Thumb

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

