# Skeleton

A placeholder that stands in for content while it loads.

## Import

```ts
import { Skeleton } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/skeleton-text-content.vue

:::

## Card

:::preview

demo-preview=../demos/skeleton-card.vue

:::

## List

:::preview

demo-preview=../demos/skeleton-list.vue

:::

## Grid

:::preview

demo-preview=../demos/skeleton-grid.vue

:::

## User Profile

:::preview

demo-preview=../demos/skeleton-user-profile.vue

:::

## Animation Types

:::preview

demo-preview=../demos/skeleton-animation-types.vue

:::

## Single Shimmer

Set `animationType="none"` on the items and put `skeleton--shimmer` on their
container to sweep one shimmer across the whole group.

:::preview

demo-preview=../demos/skeleton-single-shimmer.vue

:::

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationType` | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation style |
| `as` | `string` | `'div'` | Root element |
| `class` | `string` | `undefined` | Additional classes |

When `animationType` is not set, the component reads the `--skeleton-animation`
CSS variable, so a theme can pick the animation for every skeleton at once.
