<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { Calendar } from '../index'
import type { DayOfWeek } from '../context'

interface WeekStartCalendarProps {
  firstDayOfWeek?: DayOfWeek
  /** Month to show, so tests can pick ones whose week count varies. */
  month?: CalendarDate
}

withDefaults(defineProps<WeekStartCalendarProps>(), {
  firstDayOfWeek: undefined,
  month: () => new CalendarDate(2026, 9, 1),
})
</script>

<template>
  <Calendar :default-focused-value="month" :first-day-of-week="firstDayOfWeek">
    <Calendar.Grid v-slot="{ weeks }">
      <Calendar.GridHeader />
      <Calendar.GridBody>
        <tr v-for="(week, index) in weeks" :key="index">
          <Calendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
        </tr>
      </Calendar.GridBody>
    </Calendar.Grid>
  </Calendar>
</template>
