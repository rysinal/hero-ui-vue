<template>
  <Surface class="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
    <DateField class="w-full" name="date">
      <Label>Date</Label>
      <DateField.Group variant="secondary">
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>Enter a date</Description>
    </DateField>
    <DateField class="w-full" name="date-2">
      <Label>Appointment date</Label>
      <DateField.Group variant="secondary">
        <DateField.Prefix>
          <svg aria-hidden="true" class="size-4 text-muted" fill="none" viewBox="0 0 16 16">
            <path
              d="M5.5 1.75v2M10.5 1.75v2M2.25 6.25h11.5M3.75 3.25h8.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-8.5a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
          </svg>
        </DateField.Prefix>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>Enter a date for your appointment</Description>
    </DateField>
  </Surface>
</template>

<script setup lang="ts">
import { DateField, Description, Label, Surface } from '@rysinal/heroui-vue'
</script>
