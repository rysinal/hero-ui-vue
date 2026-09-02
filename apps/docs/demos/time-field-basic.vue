<template>
  <TimeField class="w-[256px]" name="time">
    <Label>Time</Label>
    <TimeField.Group>
      <TimeField.Input v-slot="{ segments }">
        <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </TimeField.Input>
    </TimeField.Group>
  </TimeField>
</template>

<script setup lang="ts">
import { Label, TimeField } from '@rysinal/heroui-vue'
</script>
