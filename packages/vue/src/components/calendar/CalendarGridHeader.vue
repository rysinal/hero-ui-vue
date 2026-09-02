<script setup lang="ts">
import { computed, inject } from 'vue'
import { startOfWeek } from '@internationalized/date'
import { composeTwClasses } from '../../utils'
import CalendarHeaderCell from './CalendarHeaderCell.vue'
import { CALENDAR_CONTEXT_KEY, CALENDAR_GRID_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarGridHeaderProps {
  class?: string
}

const props = defineProps<CalendarGridHeaderProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)
const grid = inject(CALENDAR_GRID_CONTEXT_KEY, null)

const headerClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.gridHeader()),
)
const rowClass = computed(() => context?.slots.value.gridRow())

const weekdays = computed(() => {
  const locale = context?.locale.value ?? 'en-US'
  const month = grid?.month.value
  if (!month) return []

  const first = startOfWeek(month, locale, context?.firstDayOfWeek?.value)
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })
  const long = new Intl.DateTimeFormat(locale, { weekday: 'long' })

  return Array.from({ length: 7 }, (_, index) => {
    const day = first.add({ days: index }).toDate('UTC')
    return { label: formatter.format(day), title: long.format(day) }
  })
})
const slotName = computed(() => calendarSlotName(context, 'grid-header'))
</script>

<template>
  <thead :class="headerClass" :data-slot="slotName">
    <tr :class="rowClass">
      <slot :weekdays="weekdays">
        <CalendarHeaderCell v-for="day in weekdays" :key="day.title" :title="day.title">
          {{ day.label }}
        </CalendarHeaderCell>
      </slot>
    </tr>
  </thead>
</template>
