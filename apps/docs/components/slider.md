# Slider

A control for choosing a value, or a range, from a continuous scale.

## Import

```ts
import { Label, Slider } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/slider-default.vue

:::

## Anatomy

```vue
<template>
  <Slider :default-value="30">
    <Label>Volume</Label>
    <Slider.Output />
    <Slider.Track>
      <Slider.Fill />
      <Slider.Thumb />
    </Slider.Track>
  </Slider>
</template>
```

## Range

Pass an array to get a range. `Slider.Track` exposes the values, so you can
render one thumb per value.

:::preview

demo-preview=../demos/slider-range.vue

:::

## Vertical

:::preview

demo-preview=../demos/slider-vertical.vue

:::

## Disabled

:::preview

demo-preview=../demos/slider-disabled.vue

:::

## Custom Element

:::preview

demo-preview=../demos/slider-custom-render-function.vue

:::

## API

### Slider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number \| number[]` | `undefined` | Current value. Supports `v-model`. Pass an array for a range |
| `defaultValue` | `number \| number[]` | `undefined` | Initial value when uncontrolled |
| `minValue` | `number` | `0` | Lower bound |
| `maxValue` | `number` | `100` | Upper bound |
| `step` | `number` | `1` | Step increment |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `isDisabled` | `boolean` | `false` | Disables the slider |
| `formatOptions` | `Intl.NumberFormatOptions` | `undefined` | Formats the output label |
| `as` | `string` | `undefined` | Root element |
| `class` | `string` | `undefined` | Additional classes |

The value comes back in the shape it was given: a number in, a number out.

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number \| number[]` | Value changed. Supports `v-model` |
| `change` | `number \| number[]` | Value changed |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `values` | `number[]` | Current thumb values |
| `percents` | `number[]` | Thumb positions from 0 to 1 |
| `labels` | `string[]` | Formatted labels |

### Slider.Output

Renders the formatted value, joining a range with an en dash. Override it
through the slot.

### Slider.Track / Slider.Fill / Slider.Thumb / Slider.Marks

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |

`Slider.Track` exposes the same slot props as the root, so a range can render
a thumb per value.
