<template>
  <!--
    Vue has no I18nProvider: the locale is passed straight to DatePicker, which
    forwards it to the field segments and to the Calendar it hosts.
  -->
  <DatePicker
    :default-value="today(getLocalTimeZone())"
    class="w-64"
    locale="hi-IN-u-ca-indian"
    name="international-date"
  >
    <Label>Event date</Label>
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
      <Calendar aria-label="Event date" locale="hi-IN-u-ca-indian">
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
import { Calendar, DateField, DatePicker, Label } from '@rysinal/heroui-vue'
import { getLocalTimeZone, today } from '@internationalized/date'
</script>
