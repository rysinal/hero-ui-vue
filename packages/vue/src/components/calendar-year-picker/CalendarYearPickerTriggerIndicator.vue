<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { YEAR_PICKER_TRIGGER_CONTEXT_KEY } from './context'

interface CalendarYearPickerTriggerIndicatorProps {
  class?: string
}

const props = defineProps<CalendarYearPickerTriggerIndicatorProps>()
const trigger = inject(YEAR_PICKER_TRIGGER_CONTEXT_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, trigger?.slots.value.triggerIndicator()),
)
</script>

<template>
  <span
    :class="indicatorClass"
    aria-hidden="true"
    data-slot="calendar-year-picker-trigger-indicator"
  >
    <slot :is-open="trigger?.isOpen.value ?? false">
      <!-- Chevron; the CSS rotates it when the picker is open. -->
      <svg
        fill="none"
        height="1em"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="1em"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </slot>
  </span>
</template>
