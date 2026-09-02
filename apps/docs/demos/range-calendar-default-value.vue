<template>
  <RangeCalendar
    aria-label="Trip dates"
    :default-value="{ end: parseDate('2025-02-12'), start: parseDate('2025-02-03') }"
  >
    <RangeCalendar.Header>
      <RangeCalendar.Heading />
      <RangeCalendar.NavButton slot="previous" />
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

<script setup lang="ts">
import { parseDate } from '@internationalized/date'
import { RangeCalendar } from '@rysinal/heroui-vue'
</script>
