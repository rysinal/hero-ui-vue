<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarCellIndicatorProps {
  class?: string
}

const props = defineProps<CalendarCellIndicatorProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.cellIndicator()),
)
const slotName = computed(() => calendarSlotName(context, 'cell-indicator'))
</script>

<template>
  <span :class="indicatorClass" :data-slot="slotName" aria-hidden="true">
    <slot />
  </span>
</template>
