<template>
  <!--
    Vue has no `render` prop: the parts expose their state through slot props
    instead, so a demo customises by reading `value` / `is-open` / the per-end
    segments from the slot rather than by swapping the rendered element.
  -->
  <DateRangePicker
    v-slot="{ isOpen, value }"
    class="w-72"
    end-name="endDate"
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
        <span class="text-xs text-muted">{{ value ? 'set' : '—' }}</span>
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <Description>{{ isOpen ? 'Picking a range…' : 'Click the icon to pick a range.' }}</Description>
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
import { DateField, DateRangePicker, Description, Label, RangeCalendar } from '@rysinal/heroui-vue'
</script>
