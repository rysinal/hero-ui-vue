<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableLoadMoreItemProps {
  class?: string
  colspan?: number
  isLoading?: boolean
}

const props = withDefaults(defineProps<TableLoadMoreItemProps>(), {
  colspan: undefined,
  isLoading: false,
})

const context = inject(TABLE_CONTEXT_KEY, null)
const loadMoreClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.loadMore()),
)
</script>

<template>
  <tr v-if="props.isLoading" :class="loadMoreClass" data-slot="table-load-more">
    <td :colspan="props.colspan">
      <slot />
    </td>
  </tr>
</template>
