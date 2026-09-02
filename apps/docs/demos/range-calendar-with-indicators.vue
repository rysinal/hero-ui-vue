<template>
  <RangeCalendar aria-label="Trip dates">
    <RangeCalendar.Header>
      <RangeCalendar.Heading />
      <RangeCalendar.NavButton slot="previous" />
      <RangeCalendar.NavButton slot="next" />
    </RangeCalendar.Header>
    <RangeCalendar.Grid v-slot="{ weeks }">
      <RangeCalendar.GridHeader />
      <RangeCalendar.GridBody>
        <tr v-for="(week, index) in weeks" :key="index">
          <RangeCalendar.Cell
            v-for="day in week"
            :key="day.toString()"
            v-slot="{ date, formattedDate }"
            :date="day"
          >
            {{ formattedDate }}
            <RangeCalendar.CellIndicator
              v-if="isToday(date, getLocalTimeZone()) || datesWithEvents.includes(date.day)"
            />
          </RangeCalendar.Cell>
        </tr>
      </RangeCalendar.GridBody>
    </RangeCalendar.Grid>
  </RangeCalendar>
</template>

<script setup lang="ts">
import { getLocalTimeZone, isToday } from '@internationalized/date'
import { RangeCalendar } from '@rysinal/heroui-vue'

const datesWithEvents = [3, 7, 12, 15, 21, 28]
</script>
