<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { SEARCH_FIELD_CONTEXT_KEY } from './context'

interface SearchFieldSearchIconProps {
  class?: string
}

const props = defineProps<SearchFieldSearchIconProps>()
const searchFieldContext = inject(SEARCH_FIELD_CONTEXT_KEY, null)
const iconClass = computed(() =>
  composeTwClasses(props.class, searchFieldContext?.slots.value.searchIcon()),
)
</script>

<template>
  <span :class="iconClass" data-slot="search-field-search-icon">
    <slot>
      <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
        <path d="m11 11 3 3M7.25 12.5a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      </svg>
    </slot>
  </span>
</template>
