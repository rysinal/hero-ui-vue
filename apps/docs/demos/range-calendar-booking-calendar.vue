<template>
  <div class="flex flex-col items-center gap-4">
    <RangeCalendar
      v-model="selectedRange"
      aria-label="Booking range"
      :is-date-unavailable="isDateUnavailable"
      :min-value="today(getLocalTimeZone())"
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
            <RangeCalendar.Cell
              v-for="day in week"
              :key="day.toString()"
              v-slot="{ date, formattedDate, isUnavailable }"
              :date="day"
            >
              {{ formattedDate }}
              <RangeCalendar.CellIndicator
                v-if="!isUnavailable && !isWeekend(date, locale) && blockedDates.includes(date.day)"
              />
            </RangeCalendar.Cell>
          </tr>
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
    </RangeCalendar>

    <div class="flex flex-col gap-2 text-center">
      <div class="flex items-center justify-center gap-4 text-xs text-muted">
        <span class="flex items-center gap-1">
          <span class="size-2 rounded-full bg-muted" /> Blocked dates
        </span>
        <span class="flex items-center gap-1">
          <span class="size-2 rounded-full bg-default" /> Weekend/Unavailable
        </span>
      </div>
      <Button v-if="selectedRange" size="sm" variant="primary">
        Book {{ selectedRange.start.toString() }} -&gt; {{ selectedRange.end.toString() }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { getLocalTimeZone, isWeekend, today, type DateValue } from '@internationalized/date'
import { Button, RangeCalendar, type DateRange } from '@rysinal/heroui-vue'

const locale = 'en-US'
const selectedRange = shallowRef<DateRange | null>(null)
const blockedDates = [5, 6, 12, 13, 14, 20]

const isDateUnavailable = (date: DateValue) =>
  isWeekend(date, locale) || blockedDates.includes(date.day)
</script>
