<template>
  <Calendar aria-label="Event date">
    <Calendar.Header>
      <Calendar.Heading />
      <Calendar.NavButton slot="previous" />
      <Calendar.NavButton slot="next" />
    </Calendar.Header>
    <Calendar.Grid v-slot="{ weeks }">
      <Calendar.GridHeader />
      <Calendar.GridBody>
        <tr v-for="(week, index) in weeks" :key="index">
          <Calendar.Cell
            v-for="day in week"
            :key="day.toString()"
            v-slot="{ date, formattedDate }"
            :date="day"
          >
            {{ formattedDate }}
            <Calendar.CellIndicator
              v-if="isToday(date, getLocalTimeZone()) || datesWithEvents.includes(date.day)"
            />
          </Calendar.Cell>
        </tr>
      </Calendar.GridBody>
    </Calendar.Grid>
  </Calendar>
</template>

<script setup lang="ts">
import { getLocalTimeZone, isToday } from '@internationalized/date'
import { Calendar } from '@rysinal/heroui-vue'

const datesWithEvents = [3, 7, 12, 15, 21, 28]
</script>
