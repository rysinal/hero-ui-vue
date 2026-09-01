# Scroll Shadow

A scrollable container that fades its edges to signal more content.

## Import

```ts
import { ScrollShadow } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/scroll-shadow-default.vue

:::

## Orientation

:::preview

demo-preview=../demos/scroll-shadow-orientation.vue

:::

## Custom Size

`size` controls how far the fade extends, in pixels.

:::preview

demo-preview=../demos/scroll-shadow-custom-size.vue

:::

## Hide Scroll Bar

:::preview

demo-preview=../demos/scroll-shadow-hide-scroll-bar.vue

:::

## Visibility Change

Listen to `visibility-change` to react as the shadows appear and disappear.

:::preview

demo-preview=../demos/scroll-shadow-visibility-change.vue

:::

## With Card

:::preview

demo-preview=../demos/scroll-shadow-with-card.vue

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Scroll direction |
| `size` | `number` | `40` | Fade length in pixels |
| `offset` | `number` | `0` | Distance from the edge before a shadow shows |
| `hideScrollBar` | `boolean` | `false` | Hides the native scrollbar |
| `isEnabled` | `boolean` | `true` | Enables the shadows |
| `visibility` | `'auto' \| 'both' \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'none'` | `'auto'` | Forces which shadows show |
| `class` | `string` | `undefined` | Additional classes |

| Event | Payload | Description |
|-------|---------|-------------|
| `visibility-change` | `ScrollShadowVisibility` | Fired when the visible shadows change |

Visibility is recalculated on scroll and, via a `ResizeObserver`, whenever the
container or its content changes size.

### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-top-scroll` | More content above |
| `data-bottom-scroll` | More content below |
| `data-top-bottom-scroll` | More content in both vertical directions |
| `data-left-scroll` | More content to the left |
| `data-right-scroll` | More content to the right |
| `data-left-right-scroll` | More content in both horizontal directions |
