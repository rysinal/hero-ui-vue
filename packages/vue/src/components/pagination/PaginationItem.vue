<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PAGINATION_CONTEXT_KEY } from './context'

interface PaginationItemProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<PaginationItemProps>(), {
  as: 'li',
})

const paginationContext = inject(PAGINATION_CONTEXT_KEY, null)
const itemClass = computed(() => composeTwClasses(props.class, paginationContext?.slots.value.item()))
</script>

<template>
  <component :is="props.as" :class="itemClass" data-slot="pagination-item">
    <slot />
  </component>
</template>
