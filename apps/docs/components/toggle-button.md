# Toggle Button

A pressable control that stays selected until toggled off.

## Import

```ts
import { ToggleButton } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/toggle-button-basic.vue

:::

## Variants

:::preview

demo-preview=../demos/toggle-button-variants.vue

:::

## Sizes

:::preview

demo-preview=../demos/toggle-button-sizes.vue

:::

## Icon Only

Use `isIconOnly` for a square button, and always pair it with an `aria-label`.

:::preview

demo-preview=../demos/toggle-button-icon-only.vue

:::

## Controlled

Bind the state with `v-model:selected`. The default slot exposes `isSelected`
so the content can react to the current state.

:::preview

demo-preview=../demos/toggle-button-controlled.vue

:::

## Disabled

:::preview

demo-preview=../demos/toggle-button-disabled.vue

:::

## Grouping

To group several toggles and let the group own the selection, see
[Toggle Button Group](/components/toggle-button-group).

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isSelected` / `selected` | `boolean` | `undefined` | Controlled selected state. Supports `v-model:selected` |
| `defaultSelected` | `boolean` | `false` | Initial selected state when uncontrolled |
| `id` | `string \| number` | `undefined` | Identifies the button inside a `ToggleButtonGroup` that owns selection |
| `isDisabled` / `disabled` | `boolean` | `undefined` | Disables the button. Inherited from the group when unset |
| `isIconOnly` | `boolean` | `false` | Renders a square icon-only button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size. Inherited from the group when unset |
| `variant` | `'default' \| 'ghost'` | `'default'` | Visual style |
| `class` | `string` | `undefined` | Additional classes |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:selected` | `boolean` | Selection changed. Supports `v-model:selected` |
| `change` | `boolean` | Selection changed |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `isSelected` | `boolean` | Whether the button is currently selected |

### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-selected` | Present when the button is selected |
| `data-disabled` | Present when the button is disabled |
| `data-hovered` | Present while the pointer is over the button |
| `data-pressed` | Present while the button is being pressed |
| `data-focus-visible` | Present when focused via keyboard |
