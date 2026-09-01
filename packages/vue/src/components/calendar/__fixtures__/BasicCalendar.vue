<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { Calendar } from '../index'
</script>

<template>
  <Calendar :default-focused-value="new CalendarDate(2026, 9, 1)" :min-value="new CalendarDate(2026, 9, 10)">
    <Calendar.Header>
      <Calendar.NavButton slot="previous" />
      <Calendar.Heading />
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
