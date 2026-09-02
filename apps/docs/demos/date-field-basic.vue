<template>
  <DateField class="w-[256px]" name="date">
    <Label>Date</Label>
    <DateField.Group>
      <DateField.Input v-slot="{ segments }">
        <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </DateField.Input>
    </DateField.Group>
  </DateField>
</template>

<script setup lang="ts">
import { DateField, Label } from '@rysinal/heroui-vue'
</script>
