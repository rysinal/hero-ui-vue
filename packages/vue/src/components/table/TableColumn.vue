<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { TABLE_CONTEXT_KEY, type TableKey } from './context'

interface TableColumnProps {
  class?: string
  /** Identifies the column for sorting. */
  id?: TableKey
  /** Marks this column as the row's header cell. */
  isRowHeader?: boolean
  allowsSorting?: boolean
  width?: string | number
}

const props = withDefaults(defineProps<TableColumnProps>(), {
  allowsSorting: false,
  id: undefined,
  isRowHeader: false,
  width: undefined,
})

const context = inject(TABLE_CONTEXT_KEY, null)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => false)

const columnClass = computed(() => composeTwClasses(props.class, context?.slots.value.column()))
const sort = computed(() => context?.sortDescriptor.value)
const isSorted = computed(() => props.id !== undefined && sort.value?.column === props.id)

// table.css keys its sort affordances off data-allows-sorting.
const ariaSort = computed(() => {
  if (!props.allowsSorting) return undefined
  if (!isSorted.value) return 'none'
  return sort.value?.direction
})

const handleClick = () => {
  if (!props.allowsSorting || props.id === undefined) return
  context?.sortByColumn(props.id)
}
</script>

<template>
  <th
    :aria-sort="ariaSort"
    :class="columnClass"
    :data-allows-sorting="dataAttr(props.allowsSorting)"
    :data-sorted="dataAttr(isSorted)"
    :style="props.width ? { width: typeof props.width === 'number' ? `${props.width}px` : props.width } : undefined"
    :scope="props.isRowHeader ? 'row' : 'col'"
    data-slot="table-column"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="handleClick"
  >
    <slot :direction="sort?.direction" :is-sorted="isSorted" />
  </th>
</template>
