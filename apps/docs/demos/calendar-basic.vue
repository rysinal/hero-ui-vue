<template>
  <Calendar aria-label="Event date">
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
</template>

<script setup lang="ts">
import { Calendar } from '@rysinal/heroui-vue'
</script>
