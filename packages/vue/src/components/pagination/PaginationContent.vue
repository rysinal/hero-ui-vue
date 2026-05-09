<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PAGINATION_CONTEXT_KEY } from './context'

interface PaginationContentProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<PaginationContentProps>(), {
  as: 'ul',
})

const paginationContext = inject(PAGINATION_CONTEXT_KEY, null)
const contentClass = computed(() =>
  composeTwClasses(props.class, paginationContext?.slots.value.content()),
)
</script>

<template>
  <component :is="props.as" :class="contentClass" data-slot="pagination-content">
    <slot />
  </component>
</template>
