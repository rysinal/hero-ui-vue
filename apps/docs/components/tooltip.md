# Tooltip

A small overlay that describes an element on hover or focus.

## Import

```ts
import { Tooltip } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/tooltip-basic.vue

:::

## Anatomy

Put the trigger directly inside `Tooltip`; it is wrapped for you. Use
`Tooltip.Trigger` explicitly when you need to pass it props such as an
`aria-label`.

```vue
<template>
  <Tooltip :delay="0">
    <Button variant="secondary">Hover me</Button>
    <Tooltip.Content>
      <p>This is a tooltip</p>
    </Tooltip.Content>
  </Tooltip>
</template>
```

## With Arrow

:::preview

demo-preview=../demos/tooltip-with-arrow.vue

:::

## Placement

:::preview

demo-preview=../demos/tooltip-placement.vue

:::

## Custom Trigger

:::preview

demo-preview=../demos/tooltip-custom-trigger.vue

:::

## Custom Attributes

:::preview

demo-preview=../demos/tooltip-custom-render-function.vue

:::

## API

### Tooltip

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `undefined` | Controlled open state. Supports `v-model:is-open` |
| `defaultOpen` | `boolean` | `false` | Initial open state |
| `delay` | `number` | `700` | Delay before opening, in milliseconds |
| `closeDelay` | `number` | `0` | Grace period before a later tooltip skips the delay |
| `isDisabled` | `boolean` | `false` | Prevents the tooltip from opening |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:isOpen` | `boolean` | Open state changed |
| `openChange` | `boolean` | Open state changed |

### Tooltip.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Preferred side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along that side |
| `offset` | `number` | `7` with an arrow, `3` without | Distance from the trigger |
| `showArrow` | `boolean` | `false` | Reserves room for `Tooltip.Arrow` |
| `portalContainer` | `HTMLElement \| string \| null` | `null` | Where to portal the tooltip |
| `class` | `string` | `undefined` | Additional classes |

### Tooltip.Trigger / Tooltip.Arrow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |

`Tooltip.Arrow` renders a default arrow; pass your own through its slot.
