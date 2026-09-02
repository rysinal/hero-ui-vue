<template>
  <div class="flex flex-col gap-4">
    <DateField class="w-[256px]" is-required name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
    </DateField>
    <DateField class="w-[256px]" is-required name="start-date">
      <Label>Start date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>Required field</Description>
    </DateField>
  </div>
</template>

<script setup lang="ts">
import { DateField, Description, Label } from '@rysinal/heroui-vue'
</script>
