<template>
  <Calendar aria-label="Custom styled calendar">
    <Calendar.Header>
      <Calendar.NavButton class="text-foreground" slot="previous" />
      <Calendar.YearPickerTrigger class="w-full justify-center">
        <Calendar.YearPickerTriggerHeading class="text-foreground" />
        <Calendar.YearPickerTriggerIndicator class="text-foreground" />
      </Calendar.YearPickerTrigger>
      <Calendar.NavButton class="text-foreground" slot="next" />
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
import { Calendar } from '@rysinal/heroui-vue'
</script>
