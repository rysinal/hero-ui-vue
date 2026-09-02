<template>
  <div class="flex flex-col gap-4">
    <DateField class="w-[256px]" name="date">
      <Label>Birth date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>Enter your date of birth</Description>
    </DateField>
    <DateField class="w-[256px]" name="appointment-date">
      <Label>Appointment date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>Enter a date for your appointment</Description>
    </DateField>
  </div>
</template>

<script setup lang="ts">
import { DateField, Description, Label } from '@rysinal/heroui-vue'
</script>
