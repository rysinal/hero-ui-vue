<template>
  <div class="flex flex-col items-center gap-4">
    <Calendar
      v-model="selectedDate"
      aria-label="Booking date"
      :is-date-unavailable="isDateUnavailable"
      :min-value="today(getLocalTimeZone())"
    >
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
              v-slot="{ date, formattedDate, isUnavailable }"
              :date="day"
            >
              {{ formattedDate }}
              <Calendar.CellIndicator
                v-if="!isUnavailable && !isWeekend(date, locale) && bookedDates.includes(date.day)"
              />
            </Calendar.Cell>
          </tr>
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>

    <div class="flex flex-col gap-2 text-center">
      <div class="flex items-center justify-center gap-4 text-xs text-muted">
        <span class="flex items-center gap-1">
          <span class="size-2 rounded-full bg-muted" /> Has bookings
        </span>
        <span class="flex items-center gap-1">
          <span class="size-2 rounded-full bg-default" /> Weekend/Unavailable
        </span>
      </div>
      <Button v-if="selectedDate" size="sm" variant="primary">
        Book {{ selectedDate.toString() }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { getLocalTimeZone, isWeekend, today, type DateValue } from '@internationalized/date'
import { Button, Calendar } from '@rysinal/heroui-vue'

const locale = 'en-US'
const selectedDate = shallowRef<DateValue | null>(null)
const bookedDates = [5, 6, 12, 13, 14, 20]

const isDateUnavailable = (date: DateValue) =>
  isWeekend(date, locale) || bookedDates.includes(date.day)
</script>
