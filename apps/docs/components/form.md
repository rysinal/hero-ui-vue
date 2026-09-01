# Form

A form element that groups fields and coordinates their validation.

## Import

```ts
import { Form } from '@rysinal/heroui-vue'
```

## Usage

Give a field a `validate` function and an empty `FieldError`; the message
appears once the value fails, and disappears when it passes.

:::preview

demo-preview=../demos/form-basic.vue

:::

## Validation Behavior

Set `validation-behavior="aria"` to suppress the browser's own validation UI
and rely on the components instead.

:::preview

demo-preview=../demos/form-custom-render-function.vue

:::

## API

### Form

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validationBehavior` | `'native' \| 'aria'` | `'native'` | `'aria'` sets `novalidate`, leaving validation to the components |
| `class` | `string` | `undefined` | Additional classes |

| Event | Payload | Description |
|-------|---------|-------------|
| `submit` | `Event` | The form was submitted |
| `reset` | `Event` | The form was reset |

### Field validation

`TextField` accepts a `validate` function returning an error message, or
`null` when the value is valid.

| Prop | Type | Description |
|------|------|-------------|
| `validate` | `(value: string) => string \| null` | Validates the current value |

Validation stays quiet until the field has been interacted with, so an
untouched empty field does not start out marked invalid. An empty
`FieldError` inside the field renders the message automatically.
