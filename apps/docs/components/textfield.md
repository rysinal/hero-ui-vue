# TextField

A complete form field: label, input, description, and validation message.

## Import

```ts
import { Description, FieldError, Input, Label, TextField, Textarea } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/textfield-basic.vue

:::

## Anatomy

`TextField` is a container. Compose the parts you need and they read their
state — type, value, disabled, invalid, required — from the field.

```vue
<template>
  <TextField name="email" type="email">
    <Label>Email</Label>
    <Input placeholder="Enter your email" />
    <Description>We'll never share this</Description>
  </TextField>
</template>
```

For simple cases the shorthand props still work without any children:

```vue
<template>
  <TextField label="Email" description="We'll never share this" placeholder="you@example.com" />
</template>
```

## With Description

:::preview

demo-preview=../demos/textfield-with-description.vue

:::

## Input Types

:::preview

demo-preview=../demos/textfield-input-types.vue

:::

## Controlled

Bind the value with `v-model`. A composed `Input` or `Textarea` updates it.

:::preview

demo-preview=../demos/textfield-controlled.vue

:::

## Textarea

:::preview

demo-preview=../demos/textfield-textarea.vue

:::

## Required

:::preview

demo-preview=../demos/textfield-required.vue

:::

## With Error

:::preview

demo-preview=../demos/textfield-with-error.vue

:::

## Validation

:::preview

demo-preview=../demos/textfield-validation.vue

:::

## Full Width

:::preview

demo-preview=../demos/textfield-full-width.vue

:::

## Disabled

:::preview

demo-preview=../demos/textfield-disabled.vue

:::

## On Surface

:::preview

demo-preview=../demos/textfield-on-surface.vue

:::

## Custom Render

Use `as` to change the root element. React exposes the same capability as `render`.

:::preview

demo-preview=../demos/textfield-custom-render-function.vue

:::

## API

### TextField

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | `undefined` | Field value. Supports `v-model` |
| `type` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url' \| 'number' \| 'date' \| 'time' \| 'datetime-local' \| 'month' \| 'week' \| 'color' \| 'file'` | `'text'` | Input type, inherited by a composed `Input` |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style, inherited by composed children |
| `name` | `string` | `undefined` | Form field name |
| `isRequired` / `required` | `boolean` | `undefined` | Marks the field required |
| `isDisabled` / `disabled` | `boolean` | `undefined` | Disables the field and its children |
| `isInvalid` | `boolean` | `undefined` | Marks the field invalid |
| `fullWidth` | `boolean` | `false` | Fill the parent width |
| `as` | `string` | `'div'` | Root element |
| `class` | `string` | `undefined` | Additional classes |

Shorthand props, used only when nothing is composed:

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Renders a `Label` |
| `description` | `string` | Renders a `Description` |
| `error` | `string` | Renders a `FieldError` and marks the field invalid |
| `placeholder` | `string` | Placeholder for the generated input |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number` | Value changed. Supports `v-model` |
| `focus` | `FocusEvent` | The field gained focus |
| `blur` | `FocusEvent` | The field lost focus |

### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-disabled` | Present when the field is disabled |
| `data-invalid` | Present when the field is invalid |
| `data-required` | Present when the field is required |
