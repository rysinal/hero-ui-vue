# Input Group

An input shell that hosts prefixes, suffixes, and a textarea alongside the field.

## Import

```ts
import { InputGroup } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/input-group-default.vue

:::

## Anatomy

Compose the group from its parts. Every part is also available as a flat
export (`InputGroupPrefix`, `InputGroupInput`, ...).

```vue
<template>
  <InputGroup>
    <InputGroup.Prefix>https://</InputGroup.Prefix>
    <InputGroup.Input placeholder="heroui" />
    <InputGroup.Suffix>.com</InputGroup.Suffix>
  </InputGroup>
</template>
```

## Variants

:::preview

demo-preview=../demos/input-group-variants.vue

:::

## With Prefix Icon

:::preview

demo-preview=../demos/input-group-with-prefix-icon.vue

:::

## With Suffix Icon

:::preview

demo-preview=../demos/input-group-with-suffix-icon.vue

:::

## With Text Prefix

:::preview

demo-preview=../demos/input-group-with-text-prefix.vue

:::

## With Text Suffix

:::preview

demo-preview=../demos/input-group-with-text-suffix.vue

:::

## With Prefix and Suffix

:::preview

demo-preview=../demos/input-group-with-prefix-and-suffix.vue

:::

## With Icon Prefix and Text Suffix

:::preview

demo-preview=../demos/input-group-with-icon-prefix-and-text-suffix.vue

:::

## With Copy Suffix

:::preview

demo-preview=../demos/input-group-with-copy-suffix.vue

:::

## With Icon Prefix and Copy Suffix

:::preview

demo-preview=../demos/input-group-with-icon-prefix-and-copy-suffix.vue

:::

## Password With Toggle

:::preview

demo-preview=../demos/input-group-password-with-toggle.vue

:::

## With Keyboard Shortcut

:::preview

demo-preview=../demos/input-group-with-keyboard-shortcut.vue

:::

## With Loading Suffix

:::preview

demo-preview=../demos/input-group-with-loading-suffix.vue

:::

## With Badge Suffix

:::preview

demo-preview=../demos/input-group-with-badge-suffix.vue

:::

## With Textarea

:::preview

demo-preview=../demos/input-group-with-textarea.vue

:::

## Full Width

:::preview

demo-preview=../demos/input-group-full-width.vue

:::

## Required

:::preview

demo-preview=../demos/input-group-required.vue

:::

## Invalid

:::preview

demo-preview=../demos/input-group-invalid.vue

:::

## Disabled

:::preview

demo-preview=../demos/input-group-disabled.vue

:::

## On Surface

:::preview

demo-preview=../demos/input-group-on-surface.vue

:::

## API

### InputGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style |
| `fullWidth` | `boolean` | `false` | Fill the parent width |
| `isDisabled` | `boolean` | `undefined` | Disables the group |
| `isInvalid` | `boolean` | `undefined` | Marks the group invalid |
| `class` | `string` | `undefined` | Additional classes |

Clicking anywhere in the group focuses its input.

### InputGroup.Input

Renders the field. Accepts the native `input` attributes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |

### InputGroup.TextArea

Renders a textarea instead of a single-line input.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `undefined` | Visible rows |
| `class` | `string` | `undefined` | Additional classes |

### InputGroup.Prefix / InputGroup.Suffix

Leading and trailing content: text, icons, buttons, chips, or a `Kbd`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |

### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-hovered` | Present while the pointer is over the group |
| `data-focus-within` | Present while a child holds focus |
| `data-disabled` | Present when the group is disabled |
| `data-invalid` | Present when the group is invalid |
