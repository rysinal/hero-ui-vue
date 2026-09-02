<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { tableVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses } from '../../utils'
import {
  TABLE_CONTEXT_KEY,
  type TableContentSelection,
  type TableKey,
  type TableSelectionMode,
  type TableSortDescriptor,
} from './context'

interface TableProps {
  class?: string
  variant?: 'primary' | 'secondary'
  selectionMode?: TableSelectionMode
  /** Controlled selection. Supports `v-model:selected-keys`. */
  selectedKeys?: TableKey[]
  defaultSelectedKeys?: TableKey[]
  /** Controlled sort. Supports `v-model:sort-descriptor`. */
  sortDescriptor?: TableSortDescriptor
}

const props = withDefaults(defineProps<TableProps>(), {
  defaultSelectedKeys: () => [],
  selectedKeys: undefined,
  selectionMode: 'none',
  sortDescriptor: undefined,
  variant: 'primary',
})

const emit = defineEmits<{
  'update:selectedKeys': [keys: TableKey[]]
  'update:sortDescriptor': [descriptor: TableSortDescriptor]
  selectionChange: [keys: TableKey[]]
  sortChange: [descriptor: TableSortDescriptor]
}>()

const slots = computed(() => tableVariants({ variant: props.variant }))

// Table.Content may declare the selection instead of the root, which is where
// React puts it; the root owns the state either way.
const contentSelection = ref<TableContentSelection>({})

const adoptContentSelection = (selection: TableContentSelection) => {
  contentSelection.value = selection
}

const effectiveSelectionMode = computed<TableSelectionMode>(
  () => contentSelection.value.selectionMode ?? props.selectionMode,
)

const internalSelectedKeys = ref<TableKey[]>([...props.defaultSelectedKeys])
const controlledKeys = computed(() => props.selectedKeys ?? contentSelection.value.selectedKeys)
const isSelectionControlled = computed(() => controlledKeys.value !== undefined)
const selectedKeys = computed(() => controlledKeys.value ?? internalSelectedKeys.value)

const internalSort = ref<TableSortDescriptor | undefined>(undefined)
const isSortControlled = computed(() => props.sortDescriptor !== undefined)
const sortDescriptor = computed(() => props.sortDescriptor ?? internalSort.value)

const toggleRow = (key: TableKey) => {
  if (effectiveSelectionMode.value === 'none') return

  const current = selectedKeys.value
  const next =
    effectiveSelectionMode.value === 'single'
      ? current.includes(key)
        ? []
        : [key]
      : current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]

  if (!isSelectionControlled.value) internalSelectedKeys.value = next
  emit('update:selectedKeys', next)
  emit('selectionChange', next)
  contentSelection.value.onSelectionChange?.(next)
}

const sortByColumn = (column: TableKey) => {
  const current = sortDescriptor.value
  // Clicking the sorted column flips the direction; a new column starts ascending.
  const next: TableSortDescriptor =
    current?.column === column && current.direction === 'ascending'
      ? { column, direction: 'descending' }
      : { column, direction: 'ascending' }

  if (!isSortControlled.value) internalSort.value = next
  emit('update:sortDescriptor', next)
  emit('sortChange', next)
}

provide(TABLE_CONTEXT_KEY, {
  adoptContentSelection,
  isRowSelected: (key) => selectedKeys.value.includes(key),
  selectedKeys,
  selectionMode: effectiveSelectionMode,
  slots,
  sortByColumn,
  sortDescriptor,
  toggleRow,
})

const tableClass = computed(() => composeTwClasses(props.class, slots.value.base()))
</script>

<template>
  <div :class="tableClass" data-slot="table">
    <slot :selected-keys="selectedKeys" :sort-descriptor="sortDescriptor" />
  </div>
</template>
