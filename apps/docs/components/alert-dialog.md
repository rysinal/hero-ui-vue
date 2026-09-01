# AlertDialog

A modal that interrupts the user to confirm a consequential action.

## Import

```ts
import { AlertDialog, Button } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/alert-dialog-default.vue

:::

## Anatomy

The first child acts as the trigger, so a plain `Button` opens the dialog.
Wrap it in `AlertDialog.Trigger` when the trigger is not itself interactive.

```vue
<template>
  <AlertDialog>
    <Button variant="danger">Delete</Button>
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>Delete this project?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>This cannot be undone.</AlertDialog.Body>
          <AlertDialog.Footer v-slot="{ close }">
            <Button variant="secondary" @click="close">Cancel</Button>
            <Button variant="danger" @click="close">Delete</Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
</template>
```

## Statuses

:::preview

demo-preview=../demos/alert-dialog-statuses.vue

:::

## Sizes

:::preview

demo-preview=../demos/alert-dialog-sizes.vue

:::

## Placements

:::preview

demo-preview=../demos/alert-dialog-placements.vue

:::

## Backdrop Variants

:::preview

demo-preview=../demos/alert-dialog-backdrop-variants.vue

:::

## Custom Backdrop

:::preview

demo-preview=../demos/alert-dialog-custom-backdrop.vue

:::

## Custom Icon

:::preview

demo-preview=../demos/alert-dialog-custom-icon.vue

:::

## Custom Trigger

:::preview

demo-preview=../demos/alert-dialog-custom-trigger.vue

:::

## Controlled

:::preview

demo-preview=../demos/alert-dialog-controlled.vue

:::

## Close Methods

:::preview

demo-preview=../demos/alert-dialog-close-methods.vue

:::

## Dismiss Behavior

:::preview

demo-preview=../demos/alert-dialog-dismiss-behavior.vue

:::

## With Close Button

:::preview

demo-preview=../demos/alert-dialog-with-close-button.vue

:::

## Custom Animations

:::preview

demo-preview=../demos/alert-dialog-custom-animations.vue

:::

## Custom Portal

:::preview

demo-preview=../demos/alert-dialog-custom-portal.vue

:::

## API

### AlertDialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `undefined` | Controlled open state. Supports `v-model:is-open` |
| `defaultOpen` | `boolean` | `false` | Initial open state |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:isOpen` | `boolean` | Open state changed |
| `openChange` | `boolean` | Open state changed |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `isOpen` | `boolean` | Whether the dialog is open |
| `open` / `close` | `() => void` | Imperative controls |

### AlertDialog.Backdrop

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'transparent' \| 'opaque' \| 'blur'` | `'opaque'` | Backdrop style |
| `isDismissable` | `boolean` | `false` | Allows closing by clicking the backdrop |
| `isKeyboardDismissDisabled` | `boolean` | `true` | Prevents closing with Escape |
| `portalContainer` | `HTMLElement \| string \| null` | `null` | Where to portal the dialog |

### AlertDialog.Container

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'auto' \| 'top' \| 'center' \| 'bottom'` | `'auto'` | Vertical placement |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'cover'` | `'md'` | Dialog width |

### AlertDialog.Icon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'danger'` | Colour and default glyph. Pass children to replace the glyph |

### AlertDialog.Footer

| Slot prop | Type | Description |
|-----------|------|-------------|
| `close` | `() => void` | Closes the dialog |
