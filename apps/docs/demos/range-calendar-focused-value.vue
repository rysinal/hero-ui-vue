<template>
  <div class="flex flex-col items-center gap-4">
    <RangeCalendar
      v-model:focused-value="focusedDate"
      aria-label="Trip dates"
      first-day-of-week="mon"
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

    <Description class="text-center">Focused: {{ focusedDate.toString() }}</Description>

    <div class="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="secondary" @click="focusedDate = parseDate('2025-01-01')">
        Go to Jan
      </Button>
      <Button size="sm" variant="secondary" @click="focusedDate = parseDate('2025-06-15')">
        Go to Jun
      </Button>
      <Button size="sm" variant="secondary" @click="focusedDate = parseDate('2025-12-25')">
        Go to Christmas
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { parseDate, type DateValue } from '@internationalized/date'
import { Button, Description, RangeCalendar } from '@rysinal/heroui-vue'

const focusedDate = shallowRef<DateValue>(parseDate('2025-06-15'))
</script>
