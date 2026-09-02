<template>
  <RangeCalendar aria-label="Trip dates">
    <RangeCalendar.Header>
      <RangeCalendar.YearPickerTrigger>
        <RangeCalendar.YearPickerTriggerHeading />
        <RangeCalendar.YearPickerTriggerIndicator />
      </RangeCalendar.YearPickerTrigger>
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
    <RangeCalendar.YearPickerGrid>
      <RangeCalendar.YearPickerGridBody v-slot="{ years }">
        <RangeCalendar.YearPickerCell v-for="year in years" :key="year" :year="year" />
      </RangeCalendar.YearPickerGridBody>
    </RangeCalendar.YearPickerGrid>
  </RangeCalendar>
</template>

<script setup lang="ts">
import { RangeCalendar } from '@rysinal/heroui-vue'
</script>
