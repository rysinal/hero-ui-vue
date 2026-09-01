# Select

Select lets users choose one or more values from a popover listbox.

## Import

```vue
<script setup lang="ts">
import {
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@rysinal/heroui-vue'
</script>
```

## Usage

:::preview

demo-preview=../demos/select-default.vue

:::

## Anatomy

```vue
<template>
  <Select placeholder="Select one">
    <Label>State</Label>
    <SelectTrigger>
      <SelectValue />
      <SelectIndicator />
    </SelectTrigger>
    <SelectPopover>
      <ListBox>
        <ListBoxItem value="california" text-value="California">
          California
          <ListBoxItemIndicator />
        </ListBoxItem>
      </ListBox>
    </SelectPopover>
  </Select>
</template>
```

## With Description

:::preview

demo-preview=../demos/select-with-description.vue

:::

## Multiple Select

:::preview

demo-preview=../demos/select-multiple-select.vue

:::

## With Sections

:::preview

demo-preview=../demos/select-with-sections.vue

:::

## With Disabled Options

:::preview

demo-preview=../demos/select-with-disabled-options.vue

:::

## Custom Indicator

:::preview

demo-preview=../demos/select-custom-indicator.vue

:::

## Required

:::preview

demo-preview=../demos/select-required.vue

:::

## Full Width

:::preview

demo-preview=../demos/select-full-width.vue

:::

## Variants

:::preview

demo-preview=../demos/select-variants.vue

:::

## On Surface

:::preview

demo-preview=../demos/select-on-surface.vue

:::

## Custom Value

:::preview

demo-preview=../demos/select-custom-value.vue

:::

## Custom Value Multiple

:::preview

demo-preview=../demos/select-custom-value-multiple.vue

:::

## Controlled

:::preview

demo-preview=../demos/select-controlled.vue

:::

## Controlled Multiple

:::preview

demo-preview=../demos/select-controlled-multiple.vue

:::

## Controlled Open State

:::preview

demo-preview=../demos/select-controlled-open-state.vue

:::

## Asynchronous Loading

:::preview

demo-preview=../demos/select-asynchronous-loading.vue

:::

## Custom Render Function

Vue does not use React render functions, but `Select` supports `as` plus root attribute passthrough for the same root customization use case.

:::preview

demo-preview=../demos/select-custom-render-function.vue

:::

## API

### Select Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `string` | `'div'` | Root element rendered inside the popover root. |
| `modelValue` | `string \| number \| (string \| number)[] \| null` | `undefined` | Controlled selected value. |
| `value` | `string \| number \| (string \| number)[] \| null` | `undefined` | React-compatible controlled selected value alias. |
| `defaultValue` | `string \| number \| (string \| number)[] \| null` | `undefined` | Initial uncontrolled selected value. |
| `selectionMode` | `'single' \| 'multiple'` | `'single'` | Whether one or multiple options can be selected. |
| `placeholder` | `string` | `'Select one'` | Value text shown before selection. |
| `disabledKeys` | `(string \| number)[]` | `[]` | Option keys that cannot be selected. |
| `disabled` / `isDisabled` | `boolean` | `undefined` | Disable the trigger and listbox interaction. |
| `required` / `isRequired` | `boolean` | `undefined` | Mark the field as required and render validation proxy inputs. |
| `isInvalid` | `boolean` | `undefined` | Apply invalid field styling. |
| `isOpen` | `boolean` | `undefined` | Controlled popover open state. |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled popover open state. |
| `name` | `string` | `undefined` | Hidden input name used for native form submission. |
| `fullWidth` | `boolean` | `false` | Stretch the root and trigger to the available width. |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Trigger visual variant. |

### Select Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `string \| number \| (string \| number)[] \| null` | Emitted when the selected value changes. |
| `update:value` | `string \| number \| (string \| number)[] \| null` | Emitted for the React-compatible value alias. |
| `selection-change` | `(string \| number)[]` | Emitted with the normalized selected key array. |
| `change` | `string \| number \| (string \| number)[] \| null` | Emitted after selection changes. |
| `update:isOpen` | `boolean` | Emitted when the popover open state changes. |
| `open-change` | `boolean` | Emitted after open state changes. |

### SelectTrigger Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `disabled` / `isDisabled` | `boolean` | `undefined` | Disable trigger activation. |

### SelectValue Slot

| Slot Prop | Type | Description |
|---|---|---|
| `defaultChildren` | `string` | Default placeholder or selected item text. |
| `isPlaceholder` | `boolean` | Whether the value is currently showing placeholder text. |
| `state.selectedItems` | `{ key, textValue }[]` | Registered selected items. |
| `state.selectedKeys` | `(string \| number)[]` | Selected key array. |
| `state.selectionMode` | `'single' \| 'multiple'` | Active selection mode. |

### SelectPopover Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred popover placement. |
| `offset` / `sideOffset` | `number` | `8` | Distance from the trigger. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment on the cross axis. |
| `alignOffset` | `number` | `0` | Alignment offset. |
| `avoidCollisions` | `boolean` | `true` | Whether the popover can flip when constrained. |
| `collisionPadding` | `number` | `0` | Collision boundary padding. |
| `portalContainer` | `HTMLElement \| string` | `'body'` | Teleport target. |

## Related Components

- [Autocomplete](/components/autocomplete)
- [List Box](/components/list-box)
- [Popover](/components/popover)
