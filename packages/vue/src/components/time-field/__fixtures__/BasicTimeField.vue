<script setup lang="ts">
import { Time } from '@internationalized/date'
import { Label } from '../../label'
import { TimeField } from '../index'

const props = defineProps<{ isReadOnly?: boolean }>()
</script>

<template>
  <TimeField :default-value="new Time(14, 30)" :is-read-only="props.isReadOnly ?? false" name="time">
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
