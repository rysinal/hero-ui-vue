<template>
  <div class="flex flex-col items-center gap-4">
    <RangeCalendar
      v-model="value"
      aria-label="Trip dates"
      first-day-of-week="mon"
      :is-invalid="isInvalid"
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
    <p v-if="isInvalid" class="text-sm text-danger">Maximum stay duration is 1 week</p>
    <Description v-else class="text-center">Select a stay of up to 7 days</Description>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Description, RangeCalendar, type DateRange } from '@rysinal/heroui-vue'

const now = today(getLocalTimeZone())
const value = shallowRef<DateRange>({ end: now.add({ days: 14 }), start: now.add({ days: 6 }) })

const isInvalid = computed(() => value.value.end.compare(value.value.start) > 7)
</script>
