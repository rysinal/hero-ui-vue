<template>
  <div class="flex flex-col gap-4">
    <TimeField class="w-[256px]" is-required name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
    </TimeField>
    <TimeField class="w-[256px]" is-required name="appointment-time">
      <Label>Appointment time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>Required field</Description>
    </TimeField>
  </div>
</template>

<script setup lang="ts">
import { Description, Label, TimeField } from '@rysinal/heroui-vue'
</script>
