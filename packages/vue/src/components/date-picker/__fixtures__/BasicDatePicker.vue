<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { Calendar } from '../../calendar'
import { DateField } from '../../date-field'
import { Label } from '../../label'
import { DatePicker } from '../index'

const props = defineProps<{ isDisabled?: boolean }>()
</script>

<template>
  <DatePicker
    :default-value="new CalendarDate(2026, 9, 5)"
    :is-disabled="props.isDisabled ?? false"
    class="w-64"
    name="date"
  >
    <Label>Date</Label>
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
    </DatePicker.Popover>
  </DatePicker>
</template>
