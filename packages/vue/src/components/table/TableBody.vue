<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableBodyProps {
  class?: string
}

const props = defineProps<TableBodyProps>()
const context = inject(TABLE_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.body()))
</script>

<template>
  <tbody :class="elementClass" data-slot="table-body">
    <slot />
  </tbody>
</template>
