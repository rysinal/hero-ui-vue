<template>
  <DateRangePicker class="w-72" end-name="endDate" start-name="startDate">
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
import { DateField, DateRangePicker, Label, RangeCalendar } from '@rysinal/heroui-vue'
</script>
