<template>
  <DateField class="w-[256px]" name="date">
    <Label>Date</Label>
    <DateField.Group>
      <DateField.Input v-slot="{ segments }">
        <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </DateField.Input>
      <DateField.Suffix>
        <svg aria-hidden="true" class="size-4 text-muted" fill="none" viewBox="0 0 16 16">
          <path
            d="M5.5 1.75v2M10.5 1.75v2M2.25 6.25h11.5M3.75 3.25h8.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-8.5a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </DateField.Suffix>
    </DateField.Group>
  </DateField>
</template>

<script setup lang="ts">
import { DateField, Label } from '@rysinal/heroui-vue'
</script>
