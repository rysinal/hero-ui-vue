<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY } from './context'

interface CalendarCellIndicatorProps {
  class?: string
}

const props = defineProps<CalendarCellIndicatorProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.cellIndicator()),
)
</script>

<template>
  <span :class="indicatorClass" aria-hidden="true" data-slot="calendar-cell-indicator">
    <slot />
  </span>
</template>
