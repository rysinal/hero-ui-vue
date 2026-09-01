# ColorPicker

A trigger and popover that hold a full colour editor.

## Import

```ts
import { ColorPicker, ColorArea, ColorSlider, ColorSwatch } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/color-picker-basic.vue

:::

## Controlled

:::preview

demo-preview=../demos/color-picker-controlled.vue

:::

## With Sliders

:::preview

demo-preview=../demos/color-picker-with-sliders.vue

:::

## With Fields

:::preview

demo-preview=../demos/color-picker-with-fields.vue

:::

## With Swatches

:::preview

demo-preview=../demos/color-picker-with-swatches.vue

:::

## API

### ColorPicker

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| Color` | `undefined` | Current colour. Supports `v-model` |
| `defaultValue` | `string \| Color` | `'#000000'` | Initial colour |
| `isOpen` | `boolean` | `undefined` | Controlled open state. Supports `v-model:is-open` |
| `defaultOpen` | `boolean` | `false` | Initial open state |

### ColorPicker.Trigger

Opens the popover. Put a `ColorSwatch` inside it to preview the current colour.

### ColorPicker.Popover

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred side |
| `offset` | `number` | `8` | Distance from the trigger |
| `portalContainer` | `HTMLElement \| string \| null` | `null` | Where to portal the popover |

Compose whatever editor you need inside: `ColorArea`, `ColorSlider`,
`ColorField` and `ColorSwatchPicker` all bind to the same colour.

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

