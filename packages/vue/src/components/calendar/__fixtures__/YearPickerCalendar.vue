<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { Calendar } from '../index'
</script>

<template>
  <Calendar
    :default-focused-value="new CalendarDate(2026, 9, 1)"
    :max-value="new CalendarDate(2028, 12, 31)"
    :min-value="new CalendarDate(2024, 1, 1)"
  >
    <Calendar.Header>
      <Calendar.YearPickerTrigger>
        <Calendar.YearPickerTriggerHeading />
        <Calendar.YearPickerTriggerIndicator />
      </Calendar.YearPickerTrigger>
      <Calendar.NavButton slot="previous" />
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
    <Calendar.YearPickerGrid>
      <Calendar.YearPickerGridBody v-slot="{ years }">
        <Calendar.YearPickerCell v-for="year in years" :key="year" :year="year" />
      </Calendar.YearPickerGridBody>
    </Calendar.YearPickerGrid>
  </Calendar>
</template>
