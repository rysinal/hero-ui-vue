# Tabs

Tabbed navigation between related panels.

## Import

```ts
import { Tabs } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/tabs-basic.vue

:::

## Anatomy

`Tabs.Indicator` goes inside each tab; it paints only for the selected one.

```vue
<template>
  <Tabs default-value="overview">
    <Tabs.ListContainer>
      <Tabs.List>
        <Tabs.Tab value="overview">
          Overview
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  </Tabs>
</template>
```

`Tabs.ListContainer` may be omitted; `Tabs.List` then wraps itself.

## Secondary

:::preview

demo-preview=../demos/tabs-secondary.vue

:::

## Vertical

:::preview

demo-preview=../demos/tabs-vertical.vue

:::

## Secondary Vertical

:::preview

demo-preview=../demos/tabs-secondary-vertical.vue

:::

## With Separator

:::preview

demo-preview=../demos/tabs-with-separator.vue

:::

## Disabled

:::preview

demo-preview=../demos/tabs-disabled.vue

:::

## Custom Styles

:::preview

demo-preview=../demos/tabs-custom-styles.vue

:::

## Reading the Selection

The default slot exposes `selectedValue`.

:::preview

demo-preview=../demos/tabs-custom-render-function.vue

:::

## API

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Controlled selected tab. Supports `v-model:value` |
| `defaultValue` | `string` | `undefined` | Initial selected tab |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style |
| `isDisabled` | `boolean` | `undefined` | Disables every tab |
| `class` | `string` | `undefined` | Additional classes |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `selectedValue` | `string \| undefined` | The currently selected tab |

### Tabs.Tab

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Identifies the tab and its panel |
| `isDisabled` | `boolean` | `undefined` | Disables this tab |
| `class` | `string` | `undefined` | Additional classes |

### Tabs.Panel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Matches the tab this panel belongs to |
| `class` | `string` | `undefined` | Additional classes |

### Tabs.ListContainer / Tabs.List / Tabs.Indicator / Tabs.Separator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional classes |
