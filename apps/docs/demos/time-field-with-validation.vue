<template>
  <div class="flex flex-col gap-4">
    <TimeField
      v-model="value"
      :is-invalid="isInvalid"
      :max-value="maxTime"
      :min-value="minTime"
      class="w-[256px]"
      is-required
      name="time"
    >
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <FieldError v-if="isInvalid">Time must be between 9:00 AM and 5:00 PM</FieldError>
      <Description v-else>Enter a time between 9:00 AM and 5:00 PM</Description>
    </TimeField>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { Description, FieldError, Label, TimeField, type TimeValue } from '@rysinal/heroui-vue'
import { parseTime } from '@internationalized/date'

const value = shallowRef<TimeValue | null>(null)
const minTime = parseTime('09:00')
const maxTime = parseTime('17:00')
const isInvalid = computed(
  () =>
    value.value !== null &&
    (value.value.compare(minTime) < 0 || value.value.compare(maxTime) > 0),
)
</script>
