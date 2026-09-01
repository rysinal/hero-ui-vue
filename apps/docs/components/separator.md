# Separator

A horizontal or vertical divider.

## Import

```ts
import { Separator } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/separator-basic.vue

:::

## Variants

:::preview

demo-preview=../demos/separator-variants.vue

:::

## Vertical

:::preview

demo-preview=../demos/separator-vertical.vue

:::

## With Content

:::preview

demo-preview=../demos/separator-with-content.vue

:::

## With Surface

:::preview

demo-preview=../demos/separator-with-surface.vue

:::

## Manual Variant Override

:::preview

demo-preview=../demos/separator-manual-variant-override.vue

:::

## Custom Element

:::preview

demo-preview=../demos/separator-custom-render-function.vue

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction. Inherited from a Toolbar or ToggleButtonGroup ancestor, which imposes the axis crossing their own |
| `variant` | `'default' \| 'secondary' \| 'tertiary'` | `'default'` | Visual style |
| `as` | `string` | `'div'` | Root element |
| `class` | `string` | `undefined` | Additional classes |
