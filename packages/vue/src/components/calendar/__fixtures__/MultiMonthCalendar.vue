<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, type CalendarDate as CalendarDateType } from '@internationalized/date'
import { Calendar } from '../index'

const locale = 'en-US'

const monthLabel = (month?: CalendarDateType) =>
  month
    ? new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        month.toDate(getLocalTimeZone()),
      )
    : ''
</script>

<template>
  <Calendar
    v-slot="{ visibleMonths }"
    :default-focused-value="new CalendarDate(2026, 9, 1)"
    :visible-months="2"
  >
    <Calendar.Header>
      <Calendar.NavButton slot="previous" />
      <span data-testid="first-label">{{ monthLabel(visibleMonths[0]) }}</span>
      <span data-testid="second-label">{{ monthLabel(visibleMonths[1]) }}</span>
      <Calendar.NavButton slot="next" />
    </Calendar.Header>
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
