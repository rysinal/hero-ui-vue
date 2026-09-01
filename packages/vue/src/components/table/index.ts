// Table carries the dot-notation parts (Table.Row, ...)
// while every part stays available as a flat export below.
export { TableNamespace as Table } from './namespace'
export { default as TableRoot } from './Table.vue'
export { default as TableBody } from './TableBody.vue'
export { default as TableCell } from './TableCell.vue'
export { default as TableCollection } from './TableCollection.vue'
export { default as TableColumn } from './TableColumn.vue'
export { default as TableColumnResizer } from './TableColumnResizer.vue'
export { default as TableContent } from './TableContent.vue'
export { default as TableFooter } from './TableFooter.vue'
export { default as TableHeader } from './TableHeader.vue'
export { default as TableLoadMoreContent } from './TableLoadMoreContent.vue'
export { default as TableLoadMoreItem } from './TableLoadMoreItem.vue'
export { default as TableResizableContainer } from './TableResizableContainer.vue'
export { default as TableRow } from './TableRow.vue'
export { default as TableScrollContainer } from './TableScrollContainer.vue'
export type {
  SortDirection,
  TableKey,
  TableSelectionMode,
  TableSortDescriptor,
} from './context'
