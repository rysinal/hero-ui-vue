<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableFooterProps {
  class?: string
}

const props = defineProps<TableFooterProps>()
const context = inject(TABLE_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.footer()))
</script>

<template>
  <tfoot :class="elementClass" data-slot="table-footer">
    <slot />
  </tfoot>
</template>
