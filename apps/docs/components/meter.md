# Meter

A labelled gauge for a value within a known range.

## Import

```ts
import { Label, Meter } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/meter-basic.vue

:::

## Colors

:::preview

demo-preview=../demos/meter-colors.vue

:::

## Sizes

:::preview

demo-preview=../demos/meter-sizes.vue

:::

## Custom Value

:::preview

demo-preview=../demos/meter-custom-value.vue

:::

## Without Label

:::preview

demo-preview=../demos/meter-without-label.vue

:::

## Anatomy

Compose the parts to control the markup. Every part is also available as a
flat export (`MeterTrack`, `MeterFill`, ...).

```vue
<template>
  <Meter :value="60">
    <Label>Label</Label>
    <Meter.Output />
    <Meter.Track>
      <Meter.Fill />
    </Meter.Track>
  </Meter>
</template>
```

Without children, the component renders a default label / output / track.

## API

### Meter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `minValue` | `number` | `0` | Lower bound |
| `maxValue` | `number` | `100` | Upper bound |
| `color` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Visual colour |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `formatOptions` | `Intl.NumberFormatOptions` | `undefined` | Formats the output, e.g. currency or percent |
| `valueLabel` | `string` | `undefined` | Replaces the formatted output entirely |
| `label` | `string` | `undefined` | Shorthand label, used when nothing is composed |
| `showValueLabel` | `boolean` | `true` | Shows the default output |
| `isDisabled` | `boolean` | `undefined` | Disables the component |
| `class` | `string` | `undefined` | Additional classes |

### Meter.Output

Renders the formatted value. Honours `formatOptions` and `valueLabel`.

### Meter.Track / Meter.Fill

The track and the filled portion. `Fill` sizes itself from the current value.
