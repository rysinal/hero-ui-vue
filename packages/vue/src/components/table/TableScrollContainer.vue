<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableScrollContainerProps {
  class?: string
}

const props = defineProps<TableScrollContainerProps>()
const context = inject(TABLE_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.scrollContainer()))
</script>

<template>
  <div :class="elementClass" data-slot="table-scroll-container">
    <slot />
  </div>
</template>
