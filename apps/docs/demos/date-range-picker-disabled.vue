<template>
  <DateRangePicker
    :model-value="value"
    class="w-72"
    end-name="endDate"
    is-disabled
    start-name="startDate"
  >
    <Label>Trip dates</Label>
    <DateField.Group full-width>
      <DateField.Input v-slot="{ segments }" slot="start">
        <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </DateField.Input>
      <DateRangePicker.RangeSeparator />
      <DateField.Input v-slot="{ segments }" slot="end">
        <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </DateField.Input>
      <DateField.Suffix>
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <Description>This date range picker is disabled.</Description>
    <DateRangePicker.Popover>
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
    </DateRangePicker.Popover>
  </DateRangePicker>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  DateField,
  DateRangePicker,
  Description,
  Label,
  RangeCalendar,
  type DateRange,
} from '@rysinal/heroui-vue'
import { getLocalTimeZone, today } from '@internationalized/date'

const start = today(getLocalTimeZone())
// shallowRef: the range holds DateValue class instances.
const value = shallowRef<DateRange | null>({ end: start.add({ days: 4 }), start })
</script>
