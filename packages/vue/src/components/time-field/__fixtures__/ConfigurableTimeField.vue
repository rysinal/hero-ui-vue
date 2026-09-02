<script setup lang="ts">
import { Time } from '@internationalized/date'
import { Label } from '../../label'
import { TimeField } from '../index'

const props = defineProps<{
  granularity?: 'hour' | 'minute' | 'second'
  hourCycle?: 12 | 24
}>()
</script>

<template>
  <TimeField
    :default-value="new Time(14, 30, 45)"
    :granularity="props.granularity ?? 'minute'"
    :hour-cycle="props.hourCycle ?? 12"
  >
    <Label>Time</Label>
    <TimeField.Group>
      <TimeField.Input v-slot="{ segments }">
        <TimeField.Segment
          v-for="(segment, index) in segments"
          :key="index"
          :segment="segment"
        />
      </TimeField.Input>
    </TimeField.Group>
  </TimeField>
</template>
