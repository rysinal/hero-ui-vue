<template>
  <div class="flex flex-col items-center gap-4">
    <RangeCalendar
      aria-label="Trip dates"
      :default-value="{ end: now.add({ days: 9 }), start: now.add({ days: 6 }) }"
      first-day-of-week="mon"
      :is-date-unavailable="isDateUnavailable"
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
    <Description class="text-center">Some days are unavailable</Description>
  </div>
</template>

<script setup lang="ts">
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { Description, RangeCalendar } from '@rysinal/heroui-vue'

const now = today(getLocalTimeZone())
const blockedRanges = [
  [now.add({ days: 2 }), now.add({ days: 5 })],
  [now.add({ days: 12 }), now.add({ days: 13 })],
] as const

const isDateUnavailable = (date: DateValue) =>
  blockedRanges.some(([start, end]) => date.compare(start) >= 0 && date.compare(end) <= 0)
</script>
