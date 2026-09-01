# ColorField

A text field for entering a colour.

## Import

```ts
import { ColorField, ColorSwatch, Label } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/color-field-basic.vue

:::

## Controlled

:::preview

demo-preview=../demos/color-field-controlled.vue

:::

## Channel Editing

:::preview

demo-preview=../demos/color-field-channel-editing.vue

:::

## With Description

:::preview

demo-preview=../demos/color-field-with-description.vue

:::

## Variants

:::preview

demo-preview=../demos/color-field-variants.vue

:::

## Required

:::preview

demo-preview=../demos/color-field-required.vue

:::

## Invalid

:::preview

demo-preview=../demos/color-field-invalid.vue

:::

## Disabled

:::preview

demo-preview=../demos/color-field-disabled.vue

:::

## Full Width

:::preview

demo-preview=../demos/color-field-full-width.vue

:::

## On Surface

:::preview

demo-preview=../demos/color-field-on-surface.vue

:::

## In a Form

:::preview

demo-preview=../demos/color-field-form-example.vue

:::

## Custom Content

:::preview

demo-preview=../demos/color-field-custom-render-function.vue

:::

## API

### ColorField

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| Color \| null` | `undefined` | Current colour. Supports `v-model` |
| `defaultValue` | `string \| Color \| null` | `null` | Initial colour |
| `channel` | `ColorChannel` | `undefined` | Edits one channel as a number instead of a whole colour |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `name` | `string` | `undefined` | Form field name |
| `isDisabled` / `isRequired` / `isInvalid` | `boolean` | `undefined` | Field state |
| `fullWidth` | `boolean` | `false` | Fill the parent width |

The text the user is typing is kept separate from the parsed colour, so an
unparseable value marks the field invalid rather than snapping back. The value
becomes `null` when the input is emptied.

### ColorField.Group / Input / Prefix / Suffix

These are `ColorInputGroup`'s parts, which is how React composes them.
`Group` accepts `variant` (`'primary' | 'secondary'`) and `fullWidth`.

### Working with colours

`parseColor` accepts hex, `rgb`/`rgba`, `hsl`/`hsla` and `hsb`. A `Color` is
immutable: `withChannelValue` returns a new one.

```ts
import { parseColor } from '@rysinal/heroui-vue'

const color = parseColor('hsl(200, 100%, 50%)')
color.getChannelValue('hue')          // 200
color.withChannelValue('hue', 210)    // a new Color
color.toString('hex')                 // '#0084ff'
```

Hold a `Color` in `shallowRef` rather than `ref`: it is immutable, so deep
reactivity buys nothing.

