# Popover

Displays rich content in a portal triggered by a button or any custom element.

## Import

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverTrigger,
} from '@rysinal/heroui-vue'
</script>
```

## Usage

:::preview

demo-preview=../demos/popover-basic.vue

:::

## Anatomy

Vue uses an explicit `PopoverTrigger` wrapper so the trigger can stay the positioning anchor without nesting native buttons.

```vue
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button>Open</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverDialog>
        <PopoverHeading>Title</PopoverHeading>
      </PopoverDialog>
    </PopoverContent>
  </Popover>
</template>
```

## With Arrow

:::preview

demo-preview=../demos/popover-with-arrow.vue

:::

## Placement

:::preview

demo-preview=../demos/popover-placement.vue

:::

## Interactive Content

:::preview

demo-preview=../demos/popover-interactive.vue

:::

## Custom Render Function

Vue does not use React render functions, but `PopoverContent` forwards attributes to the floating element. Use `class`, `data-*`, and `as`-style composition through slots for custom content.

:::preview

demo-preview=../demos/popover-custom-render-function.vue

:::

## Styling

### Passing Tailwind CSS classes

```vue
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button>Open</Button>
    </PopoverTrigger>
    <PopoverContent class="bg-accent text-accent-foreground">
      <PopoverDialog>
        <h3>Custom Styled</h3>
        <p>This popover has custom styling</p>
      </PopoverDialog>
    </PopoverContent>
  </Popover>
</template>
```

### CSS Classes

- `.popover` - Base popover container styles
- `.popover__dialog` - Dialog content wrapper
- `.popover__heading` - Heading text styles
- `.popover__trigger` - Trigger element styles

### Interactive States

- `[data-entering]` - Applied while open for appearance animation
- `[data-placement="*"]` - Applied from the preferred placement
- `:focus-visible` or `[data-focus-visible="true"]` - Trigger focus styling

## API

### Popover Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `undefined` | Controlled open state. |
| `isOpen` | `boolean` | `undefined` | Alternative controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled open state. |
| `modal` | `boolean` | `false` | Disable outside interaction while open. |

### PopoverContent Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred popover placement. |
| `offset` | `number` | `8` | Distance from the trigger. |
| `sideOffset` | `number` | `undefined` | Radix-compatible alias for offset. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment on the cross axis. |
| `alignOffset` | `number` | `0` | Alignment offset. |
| `shouldFlip` | `boolean` | `true` | Whether the popover can flip when constrained. |
| `avoidCollisions` | `boolean` | `undefined` | Radix-compatible collision control alias. |
| `collisionPadding` | `number` | `0` | Collision boundary padding. |
| `portalContainer` | `HTMLElement \| string` | `'body'` | Teleport target. |
| `unstablePortalContainer` | `HTMLElement` | `undefined` | React-compatible custom portal target alias. |

### PopoverTrigger Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `string` | `'div'` | Rendered trigger element. |
| `asChild` | `boolean` | `false` | Merge trigger behavior into the child element. |
| `disabled` / `isDisabled` | `boolean` | `undefined` | Disable trigger interaction. |

### PopoverHeading Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `string` | `undefined` | Rendered heading element override. |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3` | Heading level, matching React Aria `Heading`. |

## Related Components

- [Button](/components/button)
- [Modal](/components/modal)
- [Drawer](/components/drawer)
