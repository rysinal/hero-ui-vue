<template>
  <Form class="flex w-64 flex-col gap-3" @submit.prevent="handleSubmit">
    <DatePicker
      v-model="value"
      :is-invalid="isInvalid"
      :min-value="todayDate"
      is-required
      name="appointmentDate"
    >
      <Label>Appointment date</Label>
      <DateField.Group full-width>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <FieldError v-if="isInvalid">Date must be today or in the future.</FieldError>
      <Description v-else>Choose a valid appointment date.</Description>
      <DatePicker.Popover>
        <Calendar aria-label="Event date">
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid v-slot="{ weeks }">
            <Calendar.GridHeader />
            <Calendar.GridBody>
              <tr v-for="(week, index) in weeks" :key="index">
                <Calendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
              </tr>
            </Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody v-slot="{ years }">
              <Calendar.YearPickerCell v-for="year in years" :key="year" :year="year" />
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
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
  Calendar,
  DateField,
  DatePicker,
  Description,
  FieldError,
  Form,
  Label,
} from '@rysinal/heroui-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | null>(null)
const isSubmitting = ref(false)
const todayDate = today(getLocalTimeZone())
const isInvalid = computed(() => value.value !== null && value.value.compare(todayDate) < 0)

const handleSubmit = () => {
  if (!value.value || isInvalid.value) return

  isSubmitting.value = true
  window.setTimeout(() => {
    value.value = null
    isSubmitting.value = false
  }, 1200)
}
</script>
