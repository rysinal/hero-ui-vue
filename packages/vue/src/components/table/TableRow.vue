<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { TABLE_CONTEXT_KEY, type TableKey } from './context'

interface TableRowProps {
  class?: string
  /** Identifies the row for selection. */
  id?: TableKey
  isDisabled?: boolean
}

const props = withDefaults(defineProps<TableRowProps>(), {
  id: undefined,
  isDisabled: false,
})

const context = inject(TABLE_CONTEXT_KEY, null)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => props.isDisabled)

const rowClass = computed(() => composeTwClasses(props.class, context?.slots.value.row()))
const isSelected = computed(
  () => props.id !== undefined && (context?.isRowSelected(props.id) ?? false),
)
const isSelectable = computed(
  () => context?.selectionMode.value !== 'none' && props.id !== undefined,
)

const handleClick = () => {
  if (props.isDisabled || !isSelectable.value || props.id === undefined) return
  context?.toggleRow(props.id)
}
</script>

<template>
  <tr
    :aria-selected="isSelectable ? isSelected : undefined"
    :class="rowClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :data-selected="dataAttr(isSelected)"
    data-slot="table-row"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="handleClick"
  >
    <slot :is-selected="isSelected" />
  </tr>
</template>
