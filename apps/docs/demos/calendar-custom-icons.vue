<template>
  <Calendar aria-label="Event date">
    <Calendar.Header>
      <Calendar.Heading />
      <Calendar.NavButton slot="previous">
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z" fill="currentColor" />
        </svg>
      </Calendar.NavButton>
      <Calendar.NavButton slot="next">
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z" fill="currentColor" />
        </svg>
      </Calendar.NavButton>
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
