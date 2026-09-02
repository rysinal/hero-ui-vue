<template>
  <div class="flex flex-col items-center gap-4">
    <Calendar v-model:focused-value="focusedDate" aria-label="Event date">
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

    <Description class="text-center">Focused: {{ focusedDate.toString() }}</Description>

    <div class="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="secondary" @click="focusedDate = parseDate('2025-01-01')">
        Go to Jan
      </Button>
      <Button size="sm" variant="secondary" @click="focusedDate = parseDate('2025-06-15')">
        Go to Jun
      </Button>
      <Button size="sm" variant="secondary" @click="focusedDate = parseDate('2025-12-25')">
        Go to Christmas
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { parseDate, type DateValue } from '@internationalized/date'
import { Button, Calendar, Description } from '@rysinal/heroui-vue'

const focusedDate = shallowRef<DateValue>(parseDate('2025-06-15'))
</script>
