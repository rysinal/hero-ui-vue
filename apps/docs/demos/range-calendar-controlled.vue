<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonGroup full-width size="sm" variant="tertiary">
      <Button @click="focusedDate = today(getLocalTimeZone())">This week</Button>
      <Button
        @click="focusedDate = startOfWeek(today(getLocalTimeZone()).add({ weeks: 1 }), locale)"
      >
        Next week
      </Button>
      <Button @click="focusedDate = startOfMonth(today(getLocalTimeZone()).add({ months: 1 }))">
        Next month
      </Button>
    </ButtonGroup>

    <RangeCalendar v-model="value" v-model:focused-value="focusedDate" aria-label="Trip dates">
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

    <Description class="text-center">
      Selected range:
      {{ value ? `${value.start.toString()} -> ${value.end.toString()}` : '(none)' }}
    </Description>

    <div class="flex gap-2">
      <Button size="sm" variant="secondary" @click="setWeek()">Set 1 week</Button>
      <Button size="sm" variant="secondary" @click="setHolidays()">Set Holidays</Button>
      <Button size="sm" variant="tertiary" @click="value = null">Clear</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  getLocalTimeZone,
  parseDate,
  startOfMonth,
  startOfWeek,
  today,
  type DateValue,
} from '@internationalized/date'
import { Button, ButtonGroup, Description, RangeCalendar } from '@rysinal/heroui-vue'
import type { DateRange } from '@rysinal/heroui-vue'

const locale = 'en-US'
const value = shallowRef<DateRange | null>(null)
const focusedDate = shallowRef<DateValue>(parseDate('2025-12-25'))

const setWeek = () => {
  const start = today(getLocalTimeZone())
  value.value = { end: start.add({ days: 6 }), start }
  focusedDate.value = start
}

const setHolidays = () => {
  const start = parseDate('2025-12-20')
  value.value = { end: parseDate('2025-12-31'), start }
  focusedDate.value = start
}
</script>
