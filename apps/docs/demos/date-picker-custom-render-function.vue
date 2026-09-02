<template>
  <!--
    Vue has no `render` prop: the parts expose their state through slot props
    instead, so a demo customises by reading `value` / `is-open` / `segments`
    from the slot rather than by swapping the rendered element.
  -->
  <DatePicker v-slot="{ isOpen, value }" class="w-64" name="date">
    <Label>Date</Label>
    <DateField.Group full-width>
      <DateField.Input v-slot="{ segments }">
        <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </DateField.Input>
      <DateField.Suffix>
        <span class="text-xs text-muted">{{ value ? 'set' : '—' }}</span>
        <DatePicker.Trigger>
          <DatePicker.TriggerIndicator />
        </DatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <Description>{{ isOpen ? 'Picking a date…' : 'Click the icon to pick a date.' }}</Description>
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
