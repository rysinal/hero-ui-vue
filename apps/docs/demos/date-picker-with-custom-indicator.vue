<template>
  <DatePicker class="w-64" name="date">
    <Label>Date</Label>
    <DateField.Group full-width>
      <DateField.Input v-slot="{ segments }">
        <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </DateField.Input>
      <DateField.Suffix>
        <DatePicker.Trigger>
          <DatePicker.TriggerIndicator>
            <svg
              aria-hidden="true"
              class="size-4"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              viewBox="0 0 16 16"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </DatePicker.TriggerIndicator>
        </DatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <Description>Replace the default calendar icon by passing custom children.</Description>
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
import { Calendar, DateField, DatePicker, Description, Label } from '@rysinal/heroui-vue'
</script>
