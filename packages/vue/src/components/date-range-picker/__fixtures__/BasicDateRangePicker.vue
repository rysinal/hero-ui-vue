<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { DateField } from '../../date-field'
import { Label } from '../../label'
import { RangeCalendar } from '../../range-calendar'
import { DateRangePicker } from '../index'

const props = defineProps<{ isDisabled?: boolean }>()
</script>

<template>
  <DateRangePicker
    :default-value="{ end: new CalendarDate(2026, 9, 12), start: new CalendarDate(2026, 9, 5) }"
    :is-disabled="props.isDisabled ?? false"
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
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DateRangePicker.Popover>
      <RangeCalendar aria-label="Trip dates">
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
    </DateRangePicker.Popover>
  </DateRangePicker>
</template>
