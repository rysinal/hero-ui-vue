<template>
  <div class="flex flex-col gap-4">
    <TimeField class="w-[256px]" is-invalid is-required name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <FieldError>Please enter a valid time</FieldError>
    </TimeField>
    <TimeField class="w-[256px]" is-invalid name="invalid-time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <FieldError>Time must be within business hours</FieldError>
    </TimeField>
  </div>
</template>

<script setup lang="ts">
import { FieldError, Label, TimeField } from '@rysinal/heroui-vue'
</script>
