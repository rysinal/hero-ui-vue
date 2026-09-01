# Toolbar

Groups related controls with arrow-key navigation.

## Import

```ts
import { Separator, ToggleButton, ToggleButtonGroup, Toolbar } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/toolbar-basic.vue

:::

## Vertical

:::preview

demo-preview=../demos/toolbar-vertical.vue

:::

## With Button Group

:::preview

demo-preview=../demos/toolbar-with-button-group.vue

:::

## Attached

:::preview

demo-preview=../demos/toolbar-custom-styles.vue

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `isAttached` | `boolean` | `false` | Connects the children instead of spacing them |
| `class` | `string` | `undefined` | Additional classes |

Arrow keys move focus between the controls, with Home and End jumping to the
ends. A nested `Separator` automatically renders across the toolbar's axis.
