# ProgressBar

A horizontal bar showing progress toward completion.

## Import

```ts
import { Label, ProgressBar } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/progress-bar-basic.vue

:::

## Colors

:::preview

demo-preview=../demos/progress-bar-colors.vue

:::

## Sizes

:::preview

demo-preview=../demos/progress-bar-sizes.vue

:::

## Custom Value

:::preview

demo-preview=../demos/progress-bar-custom-value.vue

:::

## Indeterminate

:::preview

demo-preview=../demos/progress-bar-indeterminate.vue

:::

## Without Label

:::preview

demo-preview=../demos/progress-bar-without-label.vue

:::

## Anatomy

Compose the parts to control the markup. Every part is also available as a
flat export (`ProgressBarTrack`, `ProgressBarFill`, ...).

```vue
<template>
  <ProgressBar :value="60">
    <Label>Label</Label>
    <ProgressBar.Output />
    <ProgressBar.Track>
      <ProgressBar.Fill />
    </ProgressBar.Track>
  </ProgressBar>
</template>
```

Without children, the component renders a default label / output / track.

## API

### ProgressBar

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

### ProgressBar.Output

Renders the formatted value. Honours `formatOptions` and `valueLabel`.

### ProgressBar.Track / ProgressBar.Fill

The track and the filled portion. `Fill` sizes itself from the current value.
