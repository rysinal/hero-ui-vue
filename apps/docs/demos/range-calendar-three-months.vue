<template>
  <!--
    The headings read the calendar's own `visibleMonths`, so they follow the nav
    buttons. Computing them outside from today's date would leave the labels
    stranded on the first month once the user navigates.
  -->
  <RangeCalendar
    v-slot="{ visibleMonths }"
    aria-label="Vacation planning"
    class="w-auto overflow-x-auto"
    :visible-months="3"
  >
    <RangeCalendar.Heading class="sr-only" />
    <div class="flex w-max gap-7">
      <div class="w-64">
        <RangeCalendar.Header>
          <RangeCalendar.NavButton slot="previous" />
          <span class="text-sm font-medium">{{ monthLabel(visibleMonths[0]) }}</span>
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
          <span class="text-sm font-medium">{{ monthLabel(visibleMonths[1]) }}</span>
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
          <span class="text-sm font-medium">{{ monthLabel(visibleMonths[2]) }}</span>
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
import { getLocalTimeZone, type CalendarDate } from '@internationalized/date'
import { RangeCalendar } from '@rysinal/heroui-vue'

const locale = 'en-US'

const monthLabel = (month?: CalendarDate) =>
  month
    ? new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        month.toDate(getLocalTimeZone()),
      )
    : ''
</script>
