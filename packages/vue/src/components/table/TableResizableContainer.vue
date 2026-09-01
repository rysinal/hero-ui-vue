<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableResizableContainerProps {
  class?: string
}

const props = defineProps<TableResizableContainerProps>()
const context = inject(TABLE_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.resizableContainer()))
</script>

<template>
  <div :class="elementClass" data-slot="table-resizable-container">
    <slot />
  </div>
</template>
