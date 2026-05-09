<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PAGINATION_CONTEXT_KEY } from './context'

interface PaginationSummaryProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<PaginationSummaryProps>(), {
  as: 'div',
})

const paginationContext = inject(PAGINATION_CONTEXT_KEY, null)
const summaryClass = computed(() =>
  composeTwClasses(props.class, paginationContext?.slots.value.summary()),
)
</script>

<template>
  <component :is="props.as" :class="summaryClass" data-slot="pagination-summary">
    <slot />
  </component>
</template>
