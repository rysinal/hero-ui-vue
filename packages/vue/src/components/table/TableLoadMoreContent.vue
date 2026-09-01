<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableLoadMoreContentProps {
  class?: string
}

const props = defineProps<TableLoadMoreContentProps>()
const context = inject(TABLE_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.loadMoreContent()))
</script>

<template>
  <div :class="elementClass" data-slot="table-load-more-content">
    <slot />
  </div>
</template>
