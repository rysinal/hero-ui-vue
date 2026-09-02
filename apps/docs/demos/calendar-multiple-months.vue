<template>
  <Calendar aria-label="Trip dates" class="w-auto overflow-x-auto" :visible-months="2">
    <Calendar.Heading class="sr-only" />
    <div class="flex w-max gap-8">
      <div class="w-64">
        <Calendar.Header>
          <Calendar.NavButton slot="previous" />
          <span class="text-sm font-medium">{{ monthLabel(0) }}</span>
          <div class="size-6" />
        </Calendar.Header>
        <Calendar.Grid v-slot="{ weeks }">
          <Calendar.GridHeader />
          <Calendar.GridBody>
            <tr v-for="(week, index) in weeks" :key="index">
              <Calendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
            </tr>
          </Calendar.GridBody>
        </Calendar.Grid>
      </div>
      <div class="w-64">
        <Calendar.Header>
          <div class="size-6" />
          <span class="text-sm font-medium">{{ monthLabel(1) }}</span>
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid v-slot="{ weeks }" :offset="1">
          <Calendar.GridHeader />
          <Calendar.GridBody>
            <tr v-for="(week, index) in weeks" :key="index">
              <Calendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
            </tr>
          </Calendar.GridBody>
        </Calendar.Grid>
      </div>
    </div>
  </Calendar>
</template>

<script setup lang="ts">
import { getLocalTimeZone, startOfMonth, today } from '@internationalized/date'
import { Calendar } from '@rysinal/heroui-vue'

const locale = 'en-US'

// The heading is hidden, so each month names itself from the visible range.
const monthLabel = (offset: number) => {
  const month = startOfMonth(today(getLocalTimeZone())).add({ months: offset })
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    month.toDate(getLocalTimeZone()),
  )
}
</script>
