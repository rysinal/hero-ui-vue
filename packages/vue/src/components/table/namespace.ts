// Compound namespace: mirrors the React dot-notation API
// (Table.Row, Table.Cell, ...). Requires <script setup>; the options-API
// `components` option cannot resolve dotted tags.
import Table from './Table.vue'
import TableBody from './TableBody.vue'
import TableCell from './TableCell.vue'
import TableCollection from './TableCollection.vue'
import TableColumn from './TableColumn.vue'
import TableColumnResizer from './TableColumnResizer.vue'
import TableContent from './TableContent.vue'
import TableFooter from './TableFooter.vue'
import TableHeader from './TableHeader.vue'
import TableLoadMoreContent from './TableLoadMoreContent.vue'
import TableLoadMoreItem from './TableLoadMoreItem.vue'
import TableResizableContainer from './TableResizableContainer.vue'
import TableRow from './TableRow.vue'
import TableScrollContainer from './TableScrollContainer.vue'

type TableCompound = typeof Table & {
  Body: typeof TableBody
  Cell: typeof TableCell
  Collection: typeof TableCollection
  Column: typeof TableColumn
  ColumnResizer: typeof TableColumnResizer
  Content: typeof TableContent
  Footer: typeof TableFooter
  Header: typeof TableHeader
  LoadMore: typeof TableLoadMoreItem
  LoadMoreContent: typeof TableLoadMoreContent
  ResizableContainer: typeof TableResizableContainer
  Root: typeof Table
  Row: typeof TableRow
  ScrollContainer: typeof TableScrollContainer
}

export const TableNamespace: TableCompound = Object.assign(Table, {
  Body: TableBody,
  Cell: TableCell,
  Collection: TableCollection,
  Column: TableColumn,
  ColumnResizer: TableColumnResizer,
  Content: TableContent,
  Footer: TableFooter,
  Header: TableHeader,
  LoadMore: TableLoadMoreItem,
  LoadMoreContent: TableLoadMoreContent,
  ResizableContainer: TableResizableContainer,
  Root: Table,
  Row: TableRow,
  ScrollContainer: TableScrollContainer,
})
