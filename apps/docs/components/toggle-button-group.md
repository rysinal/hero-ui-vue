# Toggle Button Group

Group related toggle controls into a single connected or detached cluster.

## Import

```ts
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupSeparator,
} from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/toggle-button-group-basic.vue

:::

## Anatomy

Give each `ToggleButton` an `id` and set a `selectionMode` on the group to let the
group own the selection state.

```vue
<template>
  <ToggleButtonGroup selection-mode="multiple">
    <ToggleButton id="first">First</ToggleButton>
    <ToggleButton id="second">
      <ToggleButtonGroupSeparator />
      Second
    </ToggleButton>
    <ToggleButton id="third">
      <ToggleButtonGroupSeparator />
      Third
    </ToggleButton>
  </ToggleButtonGroup>
</template>
```

## Sizes

Set `size` on the group and every child inherits it.

:::preview

demo-preview=../demos/toggle-button-group-sizes.vue

:::

## Orientation

:::preview

demo-preview=../demos/toggle-button-group-orientation.vue

:::

## Detached

Use `isDetached` to separate buttons with gaps instead of connecting them.

:::preview

demo-preview=../demos/toggle-button-group-attached.vue

:::

## Full Width

:::preview

demo-preview=../demos/toggle-button-group-full-width.vue

:::

## Selection Mode

Use `selection-mode="single"` for mutually exclusive choices, or
`selection-mode="multiple"` for independent toggles.

:::preview

demo-preview=../demos/toggle-button-group-selection-mode.vue

:::

## Controlled

Bind `selectedKeys` with `v-model`, or listen to `@selection-change`.

:::preview

demo-preview=../demos/toggle-button-group-controlled.vue

:::

## Disabled

Disable the whole group with `isDisabled`, or a single button with its own `isDisabled`.

:::preview

demo-preview=../demos/toggle-button-group-disabled.vue

:::

## Without Separator

Omit `ToggleButtonGroupSeparator` to render a group without dividers.

:::preview

demo-preview=../demos/toggle-button-group-without-separator.vue

:::

## API

### ToggleButtonGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectionMode` | `'single' \| 'multiple'` | `undefined` | Enables group-owned selection. Without it, each button manages its own state |
| `selectedKeys` | `Array<string \| number>` | `undefined` | Controlled selection. Supports `v-model:selected-keys` |
| `defaultSelectedKeys` | `Array<string \| number>` | `[]` | Initial selection when uncontrolled |
| `disallowEmptySelection` | `boolean` | `false` | Prevents deselecting the last selected key |
| `size` | `'sm' \| 'md' \| 'lg'` | `undefined` | Size propagated to every child button |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `isDetached` | `boolean` | `false` | Separates buttons with gaps instead of connecting them |
| `fullWidth` | `boolean` | `false` | Fill the parent width |
| `isDisabled` | `boolean` | `undefined` | Disables the group and every child button |
| `class` | `string` | `undefined` | Additional classes |

| Event | Payload | Description |
|-------|---------|-------------|
| `selection-change` | `Array<string \| number>` | Fired with the next selected keys |
| `update:selectedKeys` | `Array<string \| number>` | Supports `v-model:selected-keys` |
| `update:modelValue` | `Array<string \| number>` | Supports `v-model` |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `selectedKeys` | `Array<string \| number>` | Currently selected keys |
| `toggleKey` | `(key: string \| number) => void` | Toggles a key programmatically |

### ToggleButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| number` | `undefined` | Identifies the button inside a group that owns selection |
| `isSelected` / `selected` | `boolean` | `undefined` | Controlled selected state when used standalone |
| `defaultSelected` | `boolean` | `false` | Initial selected state when uncontrolled |
| `isDisabled` / `disabled` | `boolean` | `undefined` | Disables the button. Inherited from the group when unset |
| `isIconOnly` | `boolean` | `false` | Renders a square icon-only button |
| `size` | `'sm' \| 'md' \| 'lg'` | `undefined` | Overrides the size inherited from the group |
| `variant` | `'default' \| 'ghost'` | `'default'` | Visual style |
| `class` | `string` | `undefined` | Additional classes |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:selected` | `boolean` | Standalone toggle changes. Supports `v-model:selected` |
| `change` | `boolean` | Standalone toggle changes |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `isSelected` | `boolean` | Whether the button is currently selected |

### ToggleButtonGroupSeparator

Renders a divider between attached buttons. Place it as the first child of every
button except the first one.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |
