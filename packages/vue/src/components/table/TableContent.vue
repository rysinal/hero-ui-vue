<script setup lang="ts">
import { computed, inject, watchEffect } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY, type TableKey, type TableSelectionMode } from './context'

interface TableContentProps {
  class?: string
  /** React declares selection on Content rather than the root. */
  selectionMode?: TableSelectionMode
  selectedKeys?: TableKey[]
}

const props = withDefaults(defineProps<TableContentProps>(), {
  selectedKeys: undefined,
  selectionMode: undefined,
})

const emit = defineEmits<{
  'update:selectedKeys': [keys: TableKey[]]
  selectionChange: [keys: TableKey[]]
}>()

const context = inject(TABLE_CONTEXT_KEY, null)

watchEffect(() => {
  context?.adoptContentSelection({
    onSelectionChange: (keys) => {
      emit('update:selectedKeys', keys)
      emit('selectionChange', keys)
    },
    selectedKeys: props.selectedKeys,
    selectionMode: props.selectionMode,
  })
})
const contentClass = computed(() => composeTwClasses(props.class, context?.slots.value.content()))
</script>

<template>
  <table :class="contentClass" data-slot="table-content">
    <slot />
  </table>
</template>
