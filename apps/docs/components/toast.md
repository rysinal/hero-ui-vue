# Toast

Brief notifications that stack in a corner of the screen.

## Import

```ts
import { Toast, toast } from '@rysinal/heroui-vue'
```

## Usage

Render one `Toast.Provider` somewhere in your app, then call `toast(...)` from
anywhere — an event handler, a store, a plain module.

:::preview

demo-preview=../demos/toast-default.vue

:::

## Anatomy

The provider renders one copy of its children per queued toast; the parts read
the current toast from context.

```vue
<template>
  <Toast.Provider>
    <Toast.Indicator />
    <Toast.Content>
      <Toast.Title />
      <Toast.Description />
    </Toast.Content>
    <Toast.ActionButton />
    <Toast.CloseButton />
  </Toast.Provider>
</template>
```

## Simple

:::preview

demo-preview=../demos/toast-simple.vue

:::

## Variants

:::preview

demo-preview=../demos/toast-variants.vue

:::

## Placements

Each placement needs its own queue so the regions stay independent.

:::preview

demo-preview=../demos/toast-placements.vue

:::

## Promise

A loading toast stays until the promise settles, then is replaced by the
success or error result.

:::preview

demo-preview=../demos/toast-promise.vue

:::

## Callbacks

:::preview

demo-preview=../demos/toast-callbacks.vue

:::

## Custom Queue

:::preview

demo-preview=../demos/toast-custom-queue.vue

:::

## Custom Indicator

:::preview

demo-preview=../demos/toast-custom-indicator.vue

:::

## Custom Toast

:::preview

demo-preview=../demos/toast-custom-toast.vue

:::

## API

### toast

| Call | Description |
|------|-------------|
| `toast(message, options?)` | Shows a toast and returns its key |
| `toast.success` / `danger` / `warning` / `info` | Shorthand for the matching variant |
| `toast.promise(promise, options)` | Loading toast, replaced by success or error |
| `toast.close(key)` | Closes one toast |
| `toast.clear()` | Closes all of them |
| `toast.pauseAll()` / `resumeAll()` | Freezes and resumes the countdowns |

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `description` | `string` | `undefined` | Secondary line |
| `variant` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Visual style |
| `timeout` | `number` | `4000` | Auto-dismiss delay. `0` keeps it until closed |
| `action` | `{ label, onPress? }` | `undefined` | Renders an action button |
| `isLoading` | `boolean` | `false` | Shows the loading indicator |
| `onClose` | `() => void` | `undefined` | Called once the toast goes away |

### ToastQueue

Create your own queue when you need independent regions:

```ts
const queue = new ToastQueue({ maxVisibleToasts: 2 })
queue.add({ title: 'Saved', variant: 'success' })
```

### Toast.Provider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'top' \| 'top start' \| 'top end' \| 'bottom' \| 'bottom start' \| 'bottom end'` | `'bottom'` | Where the region sits |
| `queue` | `ToastQueue` | the shared global queue | Queue to render |
| `maxVisibleToasts` | `number` | `3` | How many stay expanded before the rest collapse |
| `gap` | `number` | `12` | Gap between stacked toasts, in pixels |

Hovering the region pauses every countdown and leaving resumes it.

### Parts

`Toast.Indicator`, `Toast.Content`, `Toast.Title`, `Toast.Description`,
`Toast.ActionButton` and `Toast.CloseButton` each accept a `class`. Title,
description and the action button fall back to the queued toast's values, and
the action button and description render nothing when there is none.
