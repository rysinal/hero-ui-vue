# ProgressCircle

A circular progress indicator.

## Import

```ts
import { Label, ProgressCircle } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/progress-circle-basic.vue

:::

## Colors

:::preview

demo-preview=../demos/progress-circle-colors.vue

:::

## Sizes

:::preview

demo-preview=../demos/progress-circle-sizes.vue

:::

## With Label

:::preview

demo-preview=../demos/progress-circle-with-label.vue

:::

## Custom SVG

:::preview

demo-preview=../demos/progress-circle-custom-svg.vue

:::

## Indeterminate

:::preview

demo-preview=../demos/progress-circle-indeterminate.vue

:::

## Anatomy

Compose the parts to control the markup. Every part is also available as a
flat export (`ProgressCircleTrack`, `ProgressCircleFill`, ...).

```vue
<template>
  <ProgressCircle aria-label="Loading" :value="60">
    <ProgressCircle.Track>
      <ProgressCircle.TrackCircle />
      <ProgressCircle.FillCircle />
    </ProgressCircle.Track>
  </ProgressCircle>
</template>
```

Without children, the component renders a default label / output / track.

## API

### ProgressCircle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `undefined` | Current value |
| `minValue` | `number` | `0` | Lower bound |
| `maxValue` | `number` | `100` | Upper bound |
| `color` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Visual colour |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `isIndeterminate` | `boolean` | `undefined` | Runs the indeterminate animation regardless of value |
| `formatOptions` | `Intl.NumberFormatOptions` | `undefined` | Formats the output, e.g. currency or percent |
| `valueLabel` | `string` | `undefined` | Replaces the formatted output entirely |
| `label` | `string` | `undefined` | Shorthand label, used when nothing is composed |
| `showValueLabel` | `boolean` | `true` | Shows the default output |
| `isDisabled` | `boolean` | `undefined` | Disables the component |
| `class` | `string` | `undefined` | Additional classes |

### ProgressCircle.Track

The `svg` wrapper. Accepts `viewBox` to override the default geometry.

### ProgressCircle.TrackCircle / ProgressCircle.FillCircle

The background ring and the progress arc. Both accept `cx`, `cy`, `r` and
`strokeWidth` to override the shared geometry.
