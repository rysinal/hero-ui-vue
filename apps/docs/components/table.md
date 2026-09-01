# Table

A data table with sorting, selection and resizable columns.

## Import

```ts
import { Table } from '@rysinal/heroui-vue'
```

## Usage

:::preview

demo-preview=../demos/table-basic.vue

:::

## Anatomy

```vue
<template>
  <Table>
    <Table.ScrollContainer>
      <Table.Content aria-label="Team members">
        <Table.Header>
          <Table.Column is-row-header>Name</Table.Column>
          <Table.Column>Role</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row :id="user.id">
            <Table.Cell>{{ user.name }}</Table.Cell>
            <Table.Cell>{{ user.role }}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</template>
```

## Secondary Variant

:::preview

demo-preview=../demos/table-secondary-variant.vue

:::

## Selection

Give each row an `id` and set `selectionMode`. Clicking a row toggles it.

:::preview

demo-preview=../demos/table-selection.vue

:::

## Sorting

Mark a column `allows-sorting` and give it an `id`. The table reports the sort
descriptor; the ordering itself stays with your data.

:::preview

demo-preview=../demos/table-sorting.vue

:::

## Custom Cells

:::preview

demo-preview=../demos/table-custom-cells.vue

:::

## Empty State

:::preview

demo-preview=../demos/table-empty-state.vue

:::

## Pagination

:::preview

demo-preview=../demos/table-pagination.vue

:::

## Expandable Rows

:::preview

demo-preview=../demos/table-expandable-rows.vue

:::

## Column Resizing

:::preview

demo-preview=../demos/table-column-resizing.vue

:::

## Async Loading

:::preview

demo-preview=../demos/table-async-loading.vue

:::

## Virtualization

:::preview

demo-preview=../demos/table-virtualization.vue

:::

## With a Table Library

:::preview

demo-preview=../demos/table-tanstack-table.vue

:::

## API

### Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection behaviour. May also be set on `Table.Content` |
| `selectedKeys` | `Array<string \| number>` | `undefined` | Controlled selection. Supports `v-model:selected-keys` |
| `defaultSelectedKeys` | `Array<string \| number>` | `[]` | Initial selection |
| `sortDescriptor` | `{ column, direction }` | `undefined` | Controlled sort. Supports `v-model:sort-descriptor` |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:selectedKeys` / `selectionChange` | `Array<string \| number>` | Selection changed |
| `update:sortDescriptor` / `sortChange` | `{ column, direction }` | Sort changed |

### Table.Content

Renders the `table` element. Also accepts `selectionMode` and `selectedKeys`,
which is where React declares them.

### Table.Column

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| number` | `undefined` | Identifies the column for sorting |
| `allowsSorting` | `boolean` | `false` | Makes the column sortable |
| `isRowHeader` | `boolean` | `false` | Marks it as the row's header cell |
| `width` | `string \| number` | `undefined` | Fixed width |

Clicking a sortable column sorts ascending, then flips to descending.

### Table.Row

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| number` | `undefined` | Identifies the row for selection |
| `isDisabled` | `boolean` | `false` | Disables the row |

### Table.ColumnResizer

Drag it to resize the column it sits in.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minWidth` | `number` | `60` | Smallest width the column can reach |

### Table.LoadMore

Renders a row while `isLoading` is true, for append-on-scroll tables.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | `false` | Shows the row |
| `colspan` | `number` | `undefined` | Columns the row spans |

### Other parts

`Table.ScrollContainer`, `Table.ResizableContainer`, `Table.Header`,
`Table.Body`, `Table.Footer`, `Table.Cell`, `Table.Collection` and
`Table.LoadMoreContent` each accept a `class`.
