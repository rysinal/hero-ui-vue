<script setup lang="ts">
import { CalendarDate, isWeekend } from '@internationalized/date'
import { Calendar } from '../index'
</script>

<template>
  <Calendar
    :default-focused-value="new CalendarDate(2026, 9, 1)"
    :is-date-unavailable="(date) => isWeekend(date, 'en-US')"
    locale="en-US"
  >
    <Calendar.Header>
      <Calendar.NavButton slot="previous" />
      <Calendar.Heading />
      <Calendar.NavButton slot="next" />
    </Calendar.Header>
    <Calendar.Grid v-slot="{ weeks }">
      <Calendar.GridHeader />
      <Calendar.GridBody>
        <tr v-for="(week, index) in weeks" :key="index">
          <Calendar.Cell
            v-for="day in week"
            :key="day.toString()"
            v-slot="{ formattedDate, isUnavailable }"
            :date="day"
          >
            {{ formattedDate }}
            <Calendar.CellIndicator v-if="isUnavailable" />
          </Calendar.Cell>
        </tr>
      </Calendar.GridBody>
    </Calendar.Grid>
  </Calendar>
</template>
