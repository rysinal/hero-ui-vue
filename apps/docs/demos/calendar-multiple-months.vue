<template>
  <!--
    The headings read the calendar's own `visibleMonths`, so they follow the nav
    buttons. Computing them outside from today's date would leave the labels
    stranded on the first month once the user navigates.
  -->
  <Calendar
    v-slot="{ visibleMonths }"
    aria-label="Trip dates"
    class="w-auto overflow-x-auto"
    :visible-months="2"
  >
    <Calendar.Heading class="sr-only" />
    <div class="flex w-max gap-8">
      <div class="w-64">
        <Calendar.Header>
          <Calendar.NavButton slot="previous" />
          <span class="text-sm font-medium">{{ monthLabel(visibleMonths[0]) }}</span>
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
          <span class="text-sm font-medium">{{ monthLabel(visibleMonths[1]) }}</span>
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
import { getLocalTimeZone, type CalendarDate } from '@internationalized/date'
import { Calendar } from '@rysinal/heroui-vue'

const locale = 'en-US'

const monthLabel = (month?: CalendarDate) =>
  month
    ? new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        month.toDate(getLocalTimeZone()),
      )
    : ''
</script>
