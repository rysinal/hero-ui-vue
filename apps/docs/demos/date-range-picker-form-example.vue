<template>
  <Form class="flex w-72 flex-col gap-3" @submit.prevent="handleSubmit">
    <DateRangePicker
      v-model="value"
      :is-invalid="isInvalid"
      :min-value="currentDate"
      end-name="tripEndDate"
      is-required
      start-name="tripStartDate"
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
      <FieldError v-if="isInvalid">Please choose a valid range in the future.</FieldError>
      <Description v-else>Select your check-in and check-out dates.</Description>
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
    <Button
      :is-disabled="!value || isInvalid"
      :is-pending="isSubmitting"
      class="w-full"
      type="submit"
    >
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </Button>
  </Form>
</template>

<script setup lang="ts">
/* global window */
import { computed, ref, shallowRef } from 'vue'
import {
  Button,
  DateField,
  DateRangePicker,
  Description,
  FieldError,
  Form,
  Label,
  RangeCalendar,
  type DateRange,
} from '@rysinal/heroui-vue'
import { getLocalTimeZone, today } from '@internationalized/date'

// shallowRef: the range holds DateValue class instances.
const value = shallowRef<DateRange | null>(null)
const isSubmitting = ref(false)
const currentDate = today(getLocalTimeZone())

const isInvalid = computed(() => {
  const current = value.value
  if (!current) return false

  return current.start.compare(currentDate) < 0 || current.end.compare(current.start) < 0
})

const handleSubmit = () => {
  if (!value.value || isInvalid.value) return

  isSubmitting.value = true
  window.setTimeout(() => {
    value.value = null
    isSubmitting.value = false
  }, 1200)
}
</script>
