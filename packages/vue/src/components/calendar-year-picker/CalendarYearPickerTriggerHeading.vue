<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { YEAR_PICKER_TRIGGER_CONTEXT_KEY } from './context'

interface CalendarYearPickerTriggerHeadingProps {
  class?: string
}

const props = defineProps<CalendarYearPickerTriggerHeadingProps>()
const trigger = inject(YEAR_PICKER_TRIGGER_CONTEXT_KEY, null)

const headingClass = computed(() =>
  composeTwClasses(props.class, trigger?.slots.value.triggerHeading()),
)
const monthYear = computed(() => trigger?.monthYear.value ?? '')
</script>

<template>
  <span :class="headingClass" data-slot="calendar-year-picker-trigger-heading">
    <slot :is-open="trigger?.isOpen.value ?? false" :month-year="monthYear">{{ monthYear }}</slot>
  </span>
</template>
