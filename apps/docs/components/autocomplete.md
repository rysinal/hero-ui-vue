# Autocomplete

A searchable select: pair a trigger with a popover whose filter narrows the list as the user types.

## Import

```ts
import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  SearchField,
  useFilter,
} from '@rysinal/heroui-vue'
```

## Anatomy

`Autocomplete` is a set of composable parts rather than a single component. The
root owns selection and open state; `Autocomplete.Filter` owns the query.

```vue
<template>
  <Autocomplete v-model="selectedKey" placeholder="Select one">
    <Label>State</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value />
      <Autocomplete.ClearButton />
      <Autocomplete.Indicator />
    </Autocomplete.Trigger>
    <Autocomplete.Popover>
      <Autocomplete.Filter :filter="contains">
        <SearchField variant="secondary">
          <SearchFieldGroup>
            <SearchFieldSearchIcon />
            <SearchFieldInput autofocus placeholder="Search..." />
            <SearchFieldClearButton />
          </SearchFieldGroup>
        </SearchField>
        <ListBox>
          <ListBoxItem value="florida" text-value="Florida">
            Florida
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </Autocomplete.Filter>
    </Autocomplete.Popover>
  </Autocomplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFilter } from '@rysinal/heroui-vue'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKey = ref<string | number | null>(null)
</script>
```

Dot-notation parts (`Autocomplete.Trigger`) only resolve inside `<script setup>`.
Elsewhere, import the flat aliases instead — `AutocompleteTrigger`,
`AutocompleteValue`, and so on.

## Default

:::preview

demo-preview=../demos/autocomplete-default.vue

:::

## Single Select

:::preview

demo-preview=../demos/autocomplete-single-select.vue

:::

## Multiple Select

:::preview

demo-preview=../demos/autocomplete-multiple-select.vue

:::

## With Sections

:::preview

demo-preview=../demos/autocomplete-with-sections.vue

:::

## With Description

:::preview

demo-preview=../demos/autocomplete-with-description.vue

:::

## With Disabled Options

:::preview

demo-preview=../demos/autocomplete-with-disabled-options.vue

:::

## Allows Empty Collection

:::preview

demo-preview=../demos/autocomplete-allows-empty-collection.vue

:::

## Custom Indicator

:::preview

demo-preview=../demos/autocomplete-custom-indicator.vue

:::

## Controlled

:::preview

demo-preview=../demos/autocomplete-controlled.vue

:::

## Controlled Open State

:::preview

demo-preview=../demos/autocomplete-controlled-open-state.vue

:::

## Disabled

:::preview

demo-preview=../demos/autocomplete-disabled.vue

:::

## Required

:::preview

demo-preview=../demos/autocomplete-required.vue

:::

## Full Width

:::preview

demo-preview=../demos/autocomplete-full-width.vue

:::

## Variants

:::preview

demo-preview=../demos/autocomplete-variants.vue

:::

## Asynchronous Filtering

Leave `filter` off when a server already narrowed the list, and listen to
`input-change` to fetch. Every returned item then stays visible.

:::preview

demo-preview=../demos/autocomplete-asynchronous-filtering.vue

:::

## Email Recipients

:::preview

demo-preview=../demos/autocomplete-email-recipients.vue

:::

## Location Search

:::preview

demo-preview=../demos/autocomplete-location-search.vue

:::

## Tag Group Selection

:::preview

demo-preview=../demos/autocomplete-tag-group-selection.vue

:::

## User Selection

:::preview

demo-preview=../demos/autocomplete-user-selection.vue

:::

## User Selection Multiple

:::preview

demo-preview=../demos/autocomplete-user-selection-multiple.vue

:::

## API

### Autocomplete

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `Key \| Key[] \| null` | `undefined` | Selected key(s). Supports `v-model`. |
| `defaultValue` | `Key \| Key[] \| null` | `undefined` | Initial uncontrolled selection. |
| `selectionMode` | `'single' \| 'multiple'` | `'single'` | Whether one or many items can be selected. |
| `disabledKeys` | `Key[]` | `[]` | Item keys that cannot be selected. |
| `placeholder` | `string` | `'Select one'` | Shown by `Autocomplete.Value` before selection. |
| `isOpen` | `boolean` | `undefined` | Controls the popover open state. |
| `defaultOpen` | `boolean` | `false` | Opens the popover initially. |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Trigger visual style. |
| `fullWidth` | `boolean` | `false` | Stretch to the parent's width. |
| `isDisabled` | `boolean` | `undefined` | Disable the whole field. |
| `isInvalid` | `boolean` | `undefined` | Apply the invalid field state. |
| `isRequired` | `boolean` | `undefined` | Mark the field as required. |
| `name` | `string` | `undefined` | Name for the hidden inputs used on form submit. |
| `as` | `string` | `'div'` | Element rendered for the root. |

`Key` is `string | number`.

### Autocomplete Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `Key \| Key[] \| null` | Emitted when the selection changes. |
| `selection-change` | `Key[]` | Emitted with the selected keys. |
| `change` | `Key \| Key[] \| null` | Emitted alongside `update:modelValue`. |
| `update:isOpen` | `boolean` | Emitted when the popover opens or closes. |
| `open-change` | `boolean` | Emitted after the open state settles. |
| `clear` | – | Emitted when `Autocomplete.ClearButton` is pressed. |

### Autocomplete.Filter

| Prop | Type | Default | Description |
|---|---|---|---|
| `filter` | `(textValue: string, inputValue: string) => boolean` | `undefined` | Decides whether an item survives the query. Omit to disable filtering. |
| `inputValue` | `string` | `undefined` | Controlled query text. |

| Event | Payload | Description |
|---|---|---|
| `update:inputValue` | `string` | Emitted when the query changes. |
| `input-change` | `string` | Emitted when the query changes; use it to fetch. |

The default slot exposes `{ inputValue }`, which the demos use to decide when to
render an `EmptyState`.

### Autocomplete.Value

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `undefined` | Overrides the root's placeholder. |

The default slot exposes `{ defaultChildren, isPlaceholder, state }`, where
`state` carries `selectedItems`, `selectedKeys` and `selectionMode`.

### Autocomplete.Popover

| Prop | Type | Default | Description |
|---|---|---|---|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Side the popover opens on. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment against the trigger. |
| `offset` | `number` | `8` | Distance from the trigger. |
| `portalContainer` | `HTMLElement \| string \| null` | `null` | Where the popover is teleported. |

The popover publishes the trigger's width as `--trigger-width`, so the styles can
match its own width to the trigger.

### Autocomplete.ClearButton

| Prop | Type | Default | Description |
|---|---|---|---|
| `ariaLabel` | `string` | `'Clear selection'` | Accessible name. |

### useFilter

```ts
const { contains, startsWith, endsWith } = useFilter({ sensitivity: 'base' })
```

| Option | Type | Default | Description |
|---|---|---|---|
| `sensitivity` | `'base' \| 'accent' \| 'case' \| 'variant'` | `'variant'` | `'base'` ignores case and accents. |
| `locale` | `string` | runtime locale | BCP 47 tag used for comparison. |

Backed by `Intl.Collator`, so `contains('Café', 'cafe')` is `true` at `'base'`
sensitivity.
