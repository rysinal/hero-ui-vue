<script setup lang="ts">
import { Time } from '@internationalized/date'
import { Label } from '../../label'
import { TimeField } from '../index'
</script>

<template>
  <TimeField
    v-slot="{ isInvalid }"
    :default-value="new Time(20, 0)"
    :max-value="new Time(17, 0)"
    :min-value="new Time(9, 0)"
  >
    <Label>Time</Label>
    <TimeField.Group>
      <TimeField.Input v-slot="{ segments }">
        <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </TimeField.Input>
    </TimeField.Group>
    <span data-testid="validity">{{ isInvalid ? 'invalid' : 'valid' }}</span>
  </TimeField>
</template>
