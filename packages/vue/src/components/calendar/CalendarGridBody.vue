<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY } from './context'

interface CalendarGridBodyProps {
  class?: string
}

const props = defineProps<CalendarGridBodyProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.gridBody()))
</script>

<template>
  <tbody :class="elementClass" data-slot="calendar-grid-body">
    <slot />
  </tbody>
</template>
