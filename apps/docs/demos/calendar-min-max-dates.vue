<template>
  <div class="flex flex-col items-center gap-4">
    <Calendar aria-label="Appointment date" :max-value="maxDate" :min-value="minDate">
      <Calendar.Header>
        <Calendar.Heading />
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
    </Calendar>
    <Description class="text-center">
      Select a date between today and {{ maxDate.toString() }}
    </Description>
  </div>
</template>

<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { Calendar, Description } from '@rysinal/heroui-vue'

const now = today(getLocalTimeZone())
const minDate = now
const maxDate = now.add({ months: 3 })
</script>
