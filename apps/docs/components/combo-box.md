# ComboBox

A text input that filters a list of options as you type.

## Import

```ts
import { ComboBox, Input, Label, ListBox, ListBoxItem } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/combo-box-default.vue

:::

## Anatomy

The input is yours to render; `ComboBox.InputGroup` wires whichever input sits
inside it to the ComboBox.

```vue
<template>
  <ComboBox class="w-[256px]">
    <Label>Favorite Animal</Label>
    <ComboBox.InputGroup>
      <Input placeholder="Search animals..." />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <ComboBox.Popover>
      <ListBox>
        <ListBoxItem value="cat" text-value="Cat">Cat</ListBoxItem>
      </ListBox>
    </ComboBox.Popover>
  </ComboBox>
</template>
```

## With Description

:::preview

demo-preview=../demos/combo-box-with-description.vue

:::

## With Sections

:::preview

demo-preview=../demos/combo-box-with-sections.vue

:::

## With Disabled Options

:::preview

demo-preview=../demos/combo-box-with-disabled-options.vue

:::

## Default Selected Key

:::preview

demo-preview=../demos/combo-box-default-selected-key.vue

:::

## Controlled

:::preview

demo-preview=../demos/combo-box-controlled.vue

:::

## Controlled Input Value

:::preview

demo-preview=../demos/combo-box-controlled-input-value.vue

:::

## Custom Filtering

:::preview

demo-preview=../demos/combo-box-custom-filtering.vue

:::

## Custom Indicator

:::preview

demo-preview=../demos/combo-box-custom-indicator.vue

:::

## Custom Item Content

:::preview

demo-preview=../demos/combo-box-custom-render-function.vue

:::

## Allows Custom Value

:::preview

demo-preview=../demos/combo-box-allows-custom-value.vue

:::

## Custom Value

:::preview

demo-preview=../demos/combo-box-custom-value.vue

:::

## Menu Trigger

:::preview

demo-preview=../demos/combo-box-menu-trigger.vue

:::

## Asynchronous Loading

:::preview

demo-preview=../demos/combo-box-asynchronous-loading.vue

:::

## Required

:::preview

demo-preview=../demos/combo-box-required.vue

:::

## Disabled

:::preview

demo-preview=../demos/combo-box-disabled.vue

:::

## Full Width

:::preview

demo-preview=../demos/combo-box-full-width.vue

:::

## On Surface

:::preview

demo-preview=../demos/combo-box-on-surface.vue

:::

## API

### ComboBox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| null` | `undefined` | Selected key. Supports `v-model` |
| `defaultValue` | `string \| number \| null` | `null` | Initial selection |
| `inputValue` | `string` | `undefined` | Text in the input. Supports `v-model:input-value` |
| `defaultInputValue` | `string` | `''` | Initial text |
| `isOpen` | `boolean` | `undefined` | Controlled open state. Supports `v-model:is-open` |
| `defaultOpen` | `boolean` | `false` | Initial open state |
| `filter` | `(textValue, inputValue) => boolean` | case-insensitive contains | Decides which items match |
| `allowsCustomValue` | `boolean` | `false` | Keeps text that matches no item |
| `disabledKeys` | `Array<string \| number>` | `[]` | Keys that cannot be chosen |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `isDisabled` / `isRequired` / `isInvalid` | `boolean` | `undefined` | Field state |
| `fullWidth` | `boolean` | `false` | Fill the parent width |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` / `selectionChange` | `string \| number \| null` | Selection changed |
| `update:inputValue` | `string` | Input text changed |
| `update:isOpen` / `openChange` | `boolean` | Open state changed |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `selectedKey` | `string \| number \| null` | Current selection |
| `inputValue` | `string` | Current text |
| `isOpen` | `boolean` | Whether the list is showing |

### ComboBox.InputGroup

Wraps the input and trigger, and anchors the popover. Typing inside it filters
the list and opens it; Escape closes it and ArrowDown opens it.

### ComboBox.Trigger

A button that toggles the list. Renders a chevron by default.

### ComboBox.Popover

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'top' \| 'bottom'` | `'bottom'` | Preferred side |
| `offset` | `number` | `8` | Distance from the input |
| `portalContainer` | `HTMLElement \| string \| null` | `null` | Where to portal the list |

The list itself is a `ListBox`, so items, sections and indicators work exactly
as they do there. Choosing an item puts its label in the input and closes the
list.
