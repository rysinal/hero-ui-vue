<script setup lang="ts">
import { CalendarDateTime } from '@internationalized/date'
import { Label } from '../../label'
import { DateField } from '../index'

const props = defineProps<{ hour?: number; hourCycle?: 12 | 24 }>()
</script>

<template>
  <DateField
    :default-value="new CalendarDateTime(2026, 9, 5, props.hour ?? 8, 45)"
    :hour-cycle="props.hourCycle ?? 12"
    granularity="minute"
  >
    <Label>Date and time</Label>
    <DateField.Group>
      <DateField.Input v-slot="{ segments }">
        <DateField.Segment
          v-for="(segment, index) in segments"
          :key="index"
          :segment="segment"
        />
      </DateField.Input>
    </DateField.Group>
  </DateField>
</template>
