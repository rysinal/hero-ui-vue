<template>
  <RangeCalendar aria-label="Vacation planning" class="w-auto overflow-x-auto" :visible-months="3">
    <RangeCalendar.Heading class="sr-only" />
    <div class="flex w-max gap-7">
      <div class="w-64">
        <RangeCalendar.Header>
          <RangeCalendar.NavButton slot="previous" />
          <span class="text-sm font-medium">{{ monthLabel(0) }}</span>
          <div class="size-6" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid v-slot="{ weeks }">
          <RangeCalendar.GridHeader />
          <RangeCalendar.GridBody>
            <tr v-for="(week, index) in weeks" :key="index">
              <RangeCalendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
            </tr>
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </div>
      <div class="w-64">
        <RangeCalendar.Header>
          <div class="size-6" />
          <span class="text-sm font-medium">{{ monthLabel(1) }}</span>
          <div class="size-6" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid v-slot="{ weeks }" :offset="1">
          <RangeCalendar.GridHeader />
          <RangeCalendar.GridBody>
            <tr v-for="(week, index) in weeks" :key="index">
              <RangeCalendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
            </tr>
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </div>
      <div class="w-64">
        <RangeCalendar.Header>
          <div class="size-6" />
          <span class="text-sm font-medium">{{ monthLabel(2) }}</span>
          <RangeCalendar.NavButton slot="next" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid v-slot="{ weeks }" :offset="2">
          <RangeCalendar.GridHeader />
          <RangeCalendar.GridBody>
            <tr v-for="(week, index) in weeks" :key="index">
              <RangeCalendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
            </tr>
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </div>
    </div>
  </RangeCalendar>
</template>

<script setup lang="ts">
import { getLocalTimeZone, startOfMonth, today } from '@internationalized/date'
import { RangeCalendar } from '@rysinal/heroui-vue'

const locale = 'en-US'

// The heading is hidden, so each month names itself from the visible range.
const monthLabel = (offset: number) => {
  const month = startOfMonth(today(getLocalTimeZone())).add({ months: offset })
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    month.toDate(getLocalTimeZone()),
  )
}
</script>
