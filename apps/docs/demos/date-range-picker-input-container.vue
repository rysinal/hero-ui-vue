<template>
  <!--
    `DateField.InputContainer` wraps the two range inputs so they scroll as one
    block and the suffix stays pinned. React also renders a TimeField per end in
    the popover, bridged through `state.timeRange`; Vue's DateRangePicker has no
    such bridge (and no `shouldForceLeadingZeros`), so the time is edited through
    the field's own clock segments instead. Segments are always zero-padded here.
  -->
  <DateRangePicker
    :default-value="defaultValue"
    :hour-cycle="12"
    class="w-full max-w-2xs min-w-72"
    granularity="second"
  >
    <Label>Date range</Label>
    <DateField.Group>
      <DateField.InputContainer>
        <DateField.Input v-slot="{ segments }" slot="start">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
        <DateRangePicker.RangeSeparator />
        <DateField.Input v-slot="{ segments }" slot="end">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.InputContainer>
      <DateField.Suffix>
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DateRangePicker.Popover class="flex w-full flex-col gap-3">
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
import { DateField, DateRangePicker, Label, RangeCalendar } from '@rysinal/heroui-vue'
import { parseDateTime } from '@internationalized/date'

// A plain CalendarDateTime rather than React's zoned value: the docs are
// prerendered, and a zone read at runtime would differ from the built markup.
const defaultValue = {
  end: parseDateTime('2026-02-10T18:45:00'),
  start: parseDateTime('2026-02-03T08:45:00'),
}
</script>
