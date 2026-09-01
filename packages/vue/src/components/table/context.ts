import type { ComputedRef, InjectionKey } from 'vue'
import type { tableVariants } from '@rysinal/heroui-vue-styles'

export type TableKey = string | number
export type TableSelectionMode = 'none' | 'single' | 'multiple'
export type SortDirection = 'ascending' | 'descending'

export interface TableSortDescriptor {
  column: TableKey
  direction: SortDirection
}

export interface TableContentSelection {
  selectionMode?: TableSelectionMode
  selectedKeys?: TableKey[]
  onSelectionChange?: (keys: TableKey[]) => void
}

export interface TableContextValue {
  /** Lets Table.Content declare the selection, as React does. */
  adoptContentSelection: (selection: TableContentSelection) => void
  slots: ComputedRef<ReturnType<typeof tableVariants>>
  selectionMode: ComputedRef<TableSelectionMode>
  selectedKeys: ComputedRef<TableKey[]>
  toggleRow: (key: TableKey) => void
  isRowSelected: (key: TableKey) => boolean
  sortDescriptor: ComputedRef<TableSortDescriptor | undefined>
  sortByColumn: (column: TableKey) => void
}

export const TABLE_CONTEXT_KEY: InjectionKey<TableContextValue> = Symbol('HeroUITableContext')
