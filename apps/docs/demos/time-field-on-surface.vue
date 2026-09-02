<template>
  <Surface class="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
    <TimeField class="w-full" name="time">
      <Label>Time</Label>
      <TimeField.Group variant="secondary">
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>Enter a time</Description>
    </TimeField>
    <TimeField class="w-full" name="time-2">
      <Label>Appointment time</Label>
      <TimeField.Group variant="secondary">
        <TimeField.Prefix>
          <svg aria-hidden="true" class="size-4 text-muted" fill="none" viewBox="0 0 16 16">
            <path
              d="M8 4.5V8l2.5 1.5M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
          </svg>
        </TimeField.Prefix>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>Enter a time for your appointment</Description>
    </TimeField>
  </Surface>
</template>

<script setup lang="ts">
import { Description, Label, Surface, TimeField } from '@rysinal/heroui-vue'
</script>
