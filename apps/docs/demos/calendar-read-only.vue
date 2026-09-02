<template>
  <div class="flex flex-col items-center gap-4">
    <Calendar aria-label="Event date" is-read-only :default-value="today(getLocalTimeZone())">
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
    <Description class="text-center">Calendar is read-only</Description>
  </div>
</template>

<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { Calendar, Description } from '@rysinal/heroui-vue'
</script>
