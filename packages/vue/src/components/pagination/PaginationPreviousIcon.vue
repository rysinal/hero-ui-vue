<script setup lang="ts">
import { computed } from 'vue'
import { composeTwClasses } from '../../utils'

interface PaginationPreviousIconProps {
  class?: string
}

const props = defineProps<PaginationPreviousIconProps>()
const iconClass = computed(() => composeTwClasses(props.class, 'pagination__icon'))
</script>

<template>
  <span :class="iconClass" aria-hidden="true" data-slot="pagination-previous-icon">
    <slot>
      <svg fill="none" viewBox="0 0 20 20">
        <path
          d="m12.5 5-5 5 5 5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.8"
        />
      </svg>
    </slot>
  </span>
</template>
