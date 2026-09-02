<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DATE_RANGE_PICKER_CONTEXT_KEY } from './context'

interface DateRangePickerTriggerIndicatorProps {
  class?: string
}

const props = defineProps<DateRangePickerTriggerIndicatorProps>()
const picker = inject(DATE_RANGE_PICKER_CONTEXT_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, picker?.slots.value.triggerIndicator()),
)
</script>

<template>
  <span :class="indicatorClass" aria-hidden="true" data-slot="date-range-picker-trigger-indicator">
    <slot>
      <svg
        fill="none"
        height="1em"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="1em"
      >
        <path d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      </svg>
    </slot>
  </span>
</template>
