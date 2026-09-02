<template>
  <DateRangePicker
    v-model="value"
    :is-invalid="isInvalid"
    :min-value="currentDate"
    class="w-72"
    end-name="endDate"
    is-required
    start-name="startDate"
  >
    <Label>Booking period</Label>
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
    <FieldError>Select a valid range starting today or later.</FieldError>
    <DateRangePicker.Popover>
      <RangeCalendar aria-label="Booking period">
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
import { computed, shallowRef } from 'vue'
import {
  DateField,
  DateRangePicker,
  FieldError,
  Label,
  RangeCalendar,
  type DateRange,
} from '@rysinal/heroui-vue'
import { getLocalTimeZone, today } from '@internationalized/date'

// shallowRef: the range holds DateValue class instances.
const value = shallowRef<DateRange | null>(null)
const currentDate = today(getLocalTimeZone())

const isInvalid = computed(() => {
  const current = value.value
  if (!current) return false

  return current.start.compare(currentDate) < 0 || current.end.compare(current.start) < 0
})
</script>
