<template>
  <div class="flex flex-col gap-4">
    <TimeField class="w-[256px]" name="time">
      <Label>Start time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>Enter the start time</Description>
    </TimeField>
    <TimeField class="w-[256px]" name="end-time">
      <Label>End time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>Enter the end time</Description>
    </TimeField>
  </div>
</template>

<script setup lang="ts">
import { Description, Label, TimeField } from '@rysinal/heroui-vue'
</script>
