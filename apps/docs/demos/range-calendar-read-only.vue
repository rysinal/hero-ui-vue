<template>
  <div class="flex flex-col items-center gap-4">
    <RangeCalendar
      aria-label="Trip dates"
      is-read-only
      :default-value="{
        end: today(getLocalTimeZone()).add({ days: 4 }),
        start: today(getLocalTimeZone()),
      }"
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
    <Description class="text-center">Range calendar is read-only</Description>
  </div>
</template>

<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { Description, RangeCalendar } from '@rysinal/heroui-vue'
</script>
