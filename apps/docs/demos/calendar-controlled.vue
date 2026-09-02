<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonGroup full-width size="sm" variant="tertiary">
      <Button @click="setBoth(today(getLocalTimeZone()))">Today</Button>
      <Button @click="setBoth(startOfWeek(today(getLocalTimeZone()), locale))">Week</Button>
      <Button @click="setBoth(startOfMonth(today(getLocalTimeZone())))">Month</Button>
    </ButtonGroup>

    <Calendar v-model="value" v-model:focused-value="focusedDate" aria-label="Event date">
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
      Selected date: {{ value ? value.toString() : '(none)' }}
    </Description>

    <div class="flex gap-2">
      <Button size="sm" variant="secondary" @click="setBoth(today(getLocalTimeZone()))">
        Set Today
      </Button>
      <Button size="sm" variant="secondary" @click="setBoth(parseDate('2025-12-25'))">
        Set Christmas
      </Button>
      <Button size="sm" variant="tertiary" @click="value = null">Clear</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  getLocalTimeZone,
  parseDate,
  startOfMonth,
  startOfWeek,
  today,
  type DateValue,
} from '@internationalized/date'
import { Button, ButtonGroup, Calendar, Description } from '@rysinal/heroui-vue'

const locale = 'en-US'
const value = shallowRef<DateValue | null>(null)
const focusedDate = shallowRef<DateValue>(parseDate('2025-12-25'))

const setBoth = (date: DateValue) => {
  value.value = date
  focusedDate.value = date
}
</script>
