# Dropdown

A menu of actions or options, anchored to a trigger.

## Import

```ts
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/dropdown-default.vue

:::

## Anatomy

```vue
<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button variant="secondary">Actions</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item value="new" text-value="New file">
          <Label>New file</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>
```

React lets a bare `Button` sit directly inside `Dropdown`. Vue needs the
trigger to be wrapped in `Dropdown.Trigger`, since a template cannot re-wrap
an arbitrary first child.

## With Icons

:::preview

demo-preview=../demos/dropdown-with-icons.vue

:::

## With Descriptions

:::preview

demo-preview=../demos/dropdown-with-descriptions.vue

:::

## With Keyboard Shortcuts

:::preview

demo-preview=../demos/dropdown-with-keyboard-shortcuts.vue

:::

## With Sections

:::preview

demo-preview=../demos/dropdown-with-sections.vue

:::

## With Disabled Items

:::preview

demo-preview=../demos/dropdown-with-disabled-items.vue

:::

## Single Selection

:::preview

demo-preview=../demos/dropdown-with-single-selection.vue

:::

## Multiple Selection

:::preview

demo-preview=../demos/dropdown-with-multiple-selection.vue

:::

## Custom Indicator

:::preview

demo-preview=../demos/dropdown-single-with-custom-indicator.vue

:::

## Section Level Selection

:::preview

demo-preview=../demos/dropdown-with-section-level-selection.vue

:::

## With Submenus

:::preview

demo-preview=../demos/dropdown-with-submenus.vue

:::

## Custom Submenu Indicator

:::preview

demo-preview=../demos/dropdown-with-custom-submenu-indicator.vue

:::

## Custom Trigger

:::preview

demo-preview=../demos/dropdown-custom-trigger.vue

:::

## Controlled

:::preview

demo-preview=../demos/dropdown-controlled.vue

:::

## Controlled Open State

:::preview

demo-preview=../demos/dropdown-controlled-open-state.vue

:::

## Long Press Trigger

:::preview

demo-preview=../demos/dropdown-long-press-trigger.vue

:::

## API

### Dropdown

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `undefined` | Controlled open state. Supports `v-model:is-open` |
| `defaultOpen` | `boolean` | `false` | Initial open state |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection behaviour. May also be set on `Dropdown.Menu` |
| `selectedKeys` | `Array<string \| number>` | `undefined` | Controlled selection. Supports `v-model:selected-keys` |
| `defaultSelectedKeys` | `Array<string \| number>` | `[]` | Initial selection |
| `disallowEmptySelection` | `boolean` | `false` | Prevents clearing the last selected item |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:isOpen` / `openChange` | `boolean` | Open state changed |
| `update:selectedKeys` / `selectionChange` | `Array<string \| number>` | Selection changed |
| `action` | `string \| number \| undefined` | An item was activated |

### Dropdown.Menu

Accepts `selectionMode`, `selectedKeys` and `defaultSelectedKeys` too, which
is where React declares them. Emits `selectionChange` and `update:selectedKeys`.

### Dropdown.Popover

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred side |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment along that side |
| `offset` | `number` | `4` | Distance from the trigger |
| `portalContainer` | `HTMLElement \| string \| null` | `null` | Where to portal the menu |

### Dropdown.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | `undefined` | Identifies the item for selection |
| `textValue` | `string` | `undefined` | Text used for typeahead |
| `variant` | `'default' \| 'danger'` | `'default'` | Visual style |
| `isDisabled` | `boolean` | `false` | Disables the item |

### Dropdown.ItemIndicator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'checkmark' \| 'dot'` | `'checkmark'` | Indicator glyph |

### Dropdown.Section

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Heading above the section |

### Dropdown.SubmenuTrigger

Put the parent item in the `trigger` slot and the submenu items in the
default slot. `Dropdown.SubmenuIndicator` renders a chevron, and only appears
on an item that actually opens a submenu.
