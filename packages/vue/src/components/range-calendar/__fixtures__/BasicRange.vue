<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { RangeCalendar } from '../index'

// The 20th is booked, so a range may not span it unless allowed.
const isDateUnavailable = (date: { day: number; month: number }) =>
  date.month === 9 && date.day === 20
</script>

<template>
  <RangeCalendar
    :default-focused-value="new CalendarDate(2026, 9, 1)"
    :is-date-unavailable="isDateUnavailable"
  >
    <RangeCalendar.Header>
      <RangeCalendar.NavButton slot="previous" />
      <RangeCalendar.Heading />
      <RangeCalendar.NavButton slot="next" />
    </RangeCalendar.Header>
    <RangeCalendar.Grid v-slot="{ weeks }">
      <RangeCalendar.GridHeader />
      <RangeCalendar.GridBody>
        <tr v-for="(week, index) in weeks" :key="index">
          <RangeCalendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
        </tr>
      </RangeCalendar.GridBody>
    </RangeCalendar.Grid>
  </RangeCalendar>
</template>
