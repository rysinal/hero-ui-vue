<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PAGINATION_CONTEXT_KEY } from './context'

interface PaginationEllipsisProps {
  class?: string
}

const props = defineProps<PaginationEllipsisProps>()
const paginationContext = inject(PAGINATION_CONTEXT_KEY, null)
const ellipsisClass = computed(() =>
  composeTwClasses(props.class, paginationContext?.slots.value.ellipsis()),
)
</script>

<template>
  <span :class="ellipsisClass" aria-hidden="true" data-slot="pagination-ellipsis">
    <slot>...</slot>
  </span>
</template>
