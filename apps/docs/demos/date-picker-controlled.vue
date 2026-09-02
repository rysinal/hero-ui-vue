<template>
  <div class="flex w-64 flex-col gap-4">
    <DatePicker v-model="value" name="date">
      <Label>Date</Label>
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
    <Description>Current value: {{ value ? value.toString() : '(empty)' }}</Description>
    <div class="flex gap-2">
      <Button variant="tertiary" @click="value = today(getLocalTimeZone())">Set today</Button>
      <Button variant="tertiary" @click="value = null">Clear</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Button, Calendar, DateField, DatePicker, Description, Label } from '@rysinal/heroui-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | null>(today(getLocalTimeZone()))
</script>
