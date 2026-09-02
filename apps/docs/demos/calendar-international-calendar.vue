<template>
  <Calendar
    aria-label="Event date"
    :default-value="today(getLocalTimeZone())"
    locale="hi-IN-u-ca-indian"
  >
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
</template>

<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { Calendar } from '@rysinal/heroui-vue'
</script>
