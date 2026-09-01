# Link

An accessible hyperlink.

## Import

```ts
import { Link } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/link-basic.vue

:::

## Icon Placement

:::preview

demo-preview=../demos/link-icon-placement.vue

:::

## Custom Icon

:::preview

demo-preview=../demos/link-custom-icon.vue

:::

## Underline Variants

:::preview

demo-preview=../demos/link-underline-variants.vue

:::

## Underline Offset

:::preview

demo-preview=../demos/link-underline-offset.vue

:::

## Underline and Offset

:::preview

demo-preview=../demos/link-underline-and-offset.vue

:::

## Current and Disabled

:::preview

demo-preview=../demos/link-custom-render-function.vue

:::

## API

### Link

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `undefined` | Destination |
| `target` | `string` | `undefined` | Browsing context |
| `rel` | `string` | `undefined` | Relationship to the destination |
| `isCurrent` | `boolean` | `undefined` | Marks the current page; sets `aria-current="page"` |
| `isDisabled` | `boolean` | `undefined` | Prevents navigation and removes the link from the tab order |
| `download` | `boolean \| string` | `undefined` | Downloads the destination |
| `hrefLang` | `string` | `undefined` | Language of the destination |
| `ping` | `string` | `undefined` | URLs notified on click |
| `referrerPolicy` | `string` | `undefined` | Referrer policy |
| `as` | `string` | `'a'` | Root element |
| `class` | `string` | `undefined` | Additional classes |

### Link.Icon

Renders a trailing external-link icon by default; pass your own via the slot.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'span'` | Root element |
| `class` | `string` | `undefined` | Additional classes |
