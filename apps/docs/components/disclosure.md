# Disclosure

A disclosure is a collapsible section with a heading, a trigger, and animated content.

## Import

```ts
import {
  Disclosure,
  DisclosureBody,
  DisclosureContent,
  DisclosureHeading,
  DisclosureIndicator,
  DisclosureTrigger,
} from '@heroui-vue/vue'
```

## Usage

:::preview

demo-preview=../demos/disclosure-basic.vue

:::

## Anatomy

```vue
<Disclosure>
  <DisclosureHeading>
    <DisclosureTrigger>
      <DisclosureIndicator />
    </DisclosureTrigger>
  </DisclosureHeading>
  <DisclosureContent>
    <DisclosureBody />
  </DisclosureContent>
</Disclosure>
```

## Related Components

- [Accordion](/components/accordion)
- DisclosureGroup

## Custom Render Function

Vue uses `as` and fallthrough attributes for the same customization surface.

:::preview

demo-preview=../demos/disclosure-custom-render-function.vue

:::

## Styling

Use `DisclosureTrigger`, `DisclosureIndicator`, and `DisclosureContent` for component behavior. Demo-only layout and trigger visual styling are included in each demo source.

## API

### Disclosure Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` / `isExpanded` | `boolean` | `undefined` | Controlled expanded state |
| `defaultExpanded` | `boolean` | `false` | Initial uncontrolled expanded state |
| `disabled` / `isDisabled` | `boolean` | `false` | Disables trigger interaction |
| `as` | `string` | `'div'` | Root element tag |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:expanded` | `boolean` | Emitted when expanded state changes |
| `update:isExpanded` | `boolean` | Emitted when expanded state changes |
| `expanded-change` | `boolean` | Emitted when expanded state changes |
