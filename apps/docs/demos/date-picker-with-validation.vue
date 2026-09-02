<template>
  <DatePicker
    v-model="value"
    :is-invalid="isInvalid"
    :min-value="todayDate"
    class="w-64"
    is-required
    name="date"
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
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { Calendar, DateField, DatePicker, FieldError, Label } from '@rysinal/heroui-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | null>(null)
const todayDate = today(getLocalTimeZone())
const isInvalid = computed(() => value.value !== null && value.value.compare(todayDate) < 0)
</script>
