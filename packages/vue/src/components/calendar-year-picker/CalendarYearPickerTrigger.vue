<script setup lang="ts">
/* global KeyboardEvent */
import { computed, inject, provide } from 'vue'
import { calendarYearPickerVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { CALENDAR_CONTEXT_KEY } from '../calendar/context'
import {
  YEAR_PICKER_CONTEXT_KEY,
  YEAR_PICKER_TRIGGER_CONTEXT_KEY,
} from './context'

interface CalendarYearPickerTriggerProps {
  class?: string
}

const props = defineProps<CalendarYearPickerTriggerProps>()

const calendar = inject(CALENDAR_CONTEXT_KEY, null)
const yearPicker = inject(YEAR_PICKER_CONTEXT_KEY, null)

const slots = computed(() => calendarYearPickerVariants())
const triggerClass = computed(() => composeTwClasses(props.class, slots.value.trigger()))

const isOpen = computed(() => yearPicker?.isOpen.value ?? false)

/** "December 2025", honouring the calendar system and BC eras like React does. */
const monthYear = computed(() => {
  const focused = calendar?.focusedDate.value
  if (!focused) return ''

  const locale = calendar?.locale.value ?? 'en-US'
  const identifier = focused.calendar.identifier

  return new Intl.DateTimeFormat(locale, {
    calendar: identifier,
    era: identifier === 'gregory' && focused.era === 'BC' ? 'short' : undefined,
    month: 'long',
    year: 'numeric',
  }).format(focused.toDate('UTC'))
})

const toggle = () => yearPicker?.setIsOpen(!isOpen.value)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !isOpen.value) return
  event.preventDefault()
  yearPicker?.setIsOpen(false)
}

provide(YEAR_PICKER_TRIGGER_CONTEXT_KEY, { isOpen, monthYear, slots, toggle })
</script>

<template>
  <button
    :aria-expanded="isOpen"
    :aria-label="`${monthYear}, year selector`"
    :class="triggerClass"
    :data-open="dataAttr(isOpen)"
    data-slot="calendar-year-picker-trigger"
    type="button"
    @click="toggle"
    @keydown="handleKeydown"
  >
    <slot :is-open="isOpen" :month-year="monthYear" :toggle="toggle" />
  </button>
</template>
