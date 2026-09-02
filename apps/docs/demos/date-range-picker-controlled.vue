<template>
  <div class="flex w-72 flex-col gap-4">
    <DateRangePicker v-model="value" end-name="endDate" start-name="startDate">
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
    <Description>
      Current value:
      {{ value ? `${value.start.toString()} -> ${value.end.toString()}` : '(empty)' }}
    </Description>
    <div class="flex gap-2">
      <Button variant="tertiary" @click="setWeek">Set week</Button>
      <Button variant="tertiary" @click="value = null">Clear</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  Button,
  DateField,
  DateRangePicker,
  Description,
  Label,
  RangeCalendar,
  type DateRange,
} from '@rysinal/heroui-vue'
import { getLocalTimeZone, today } from '@internationalized/date'

const start = today(getLocalTimeZone())
// shallowRef: the range holds DateValue class instances, which a deep ref would
// wrap in a proxy and strip the brand off.
const value = shallowRef<DateRange | null>({ end: start.add({ days: 4 }), start })

const setWeek = () => {
  const nextStart = today(getLocalTimeZone())

  value.value = { end: nextStart.add({ days: 6 }), start: nextStart }
}
</script>
