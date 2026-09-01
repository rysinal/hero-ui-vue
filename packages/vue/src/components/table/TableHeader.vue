<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableHeaderProps {
  class?: string
}

const props = defineProps<TableHeaderProps>()
const context = inject(TABLE_CONTEXT_KEY, null)
const headerClass = computed(() => composeTwClasses(props.class, context?.slots.value.header()))
</script>

<template>
  <thead :class="headerClass" data-slot="table-header">
    <tr>
      <slot />
    </tr>
  </thead>
</template>
