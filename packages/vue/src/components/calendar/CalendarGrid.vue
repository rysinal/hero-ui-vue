<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import {
  getWeeksInMonth,
  startOfMonth,
  startOfWeek,
  type CalendarDate,
} from '@internationalized/date'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY, CALENDAR_GRID_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarGridProps {
  class?: string
  /** Which visible month to render, when several are shown. */
  offset?: number
}

const props = withDefaults(defineProps<CalendarGridProps>(), {
  offset: 0,
})

const context = inject(CALENDAR_CONTEXT_KEY, null)

const month = computed<CalendarDate>(() => {
  const months = context?.visibleMonths.value ?? []
  return months[props.offset] ?? months[0] ?? startOfMonth(new Date() as never as CalendarDate)
})

provide(CALENDAR_GRID_CONTEXT_KEY, { month })

const gridClass = computed(() => composeTwClasses(props.class, context?.slots.value.grid()))
const slotName = computed(() => calendarSlotName(context, 'grid'))

/** Whole weeks covering the month, so the grid is always rectangular. */
const weeks = computed(() => {
  const locale = context?.locale.value ?? 'en-US'
  const firstDayOfWeek = context?.firstDayOfWeek?.value
  const first = startOfWeek(month.value, locale, firstDayOfWeek)
  const count = getWeeksInMonth(month.value, locale, firstDayOfWeek)

  return Array.from({ length: count }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => first.add({ days: weekIndex * 7 + dayIndex })),
  )
})

const weekdays = computed(() => {
  const locale = context?.locale.value ?? 'en-US'
  const first = startOfWeek(month.value, locale, context?.firstDayOfWeek?.value)
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(first.add({ days: index }).toDate('UTC')),
  )
})
</script>

<template>
  <table :class="gridClass" :data-slot="slotName">
    <slot :month="month" :weekdays="weekdays" :weeks="weeks" />
  </table>
</template>
