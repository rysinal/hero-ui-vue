<template>
  <div class="w-[400px] space-y-4">
    <TimeField full-width name="time">
      <Label>Time</Label>
      <TimeField.Group full-width>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
    </TimeField>
    <TimeField full-width name="time-icons">
      <Label>Time</Label>
      <TimeField.Group full-width>
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
        <TimeField.Suffix>
          <svg aria-hidden="true" class="size-4 text-muted" fill="none" viewBox="0 0 16 16">
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
          </svg>
        </TimeField.Suffix>
      </TimeField.Group>
    </TimeField>
  </div>
</template>

<script setup lang="ts">
import { Label, TimeField } from '@rysinal/heroui-vue'
</script>
