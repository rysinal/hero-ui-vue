<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableCellProps {
  class?: string
  colspan?: number
}

const props = defineProps<TableCellProps>()
const context = inject(TABLE_CONTEXT_KEY, null)
const cellClass = computed(() => composeTwClasses(props.class, context?.slots.value.cell()))
</script>

<template>
  <td :class="cellClass" :colspan="props.colspan" data-slot="table-cell">
    <slot />
  </td>
</template>
