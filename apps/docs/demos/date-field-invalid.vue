<template>
  <div class="flex flex-col gap-4">
    <DateField class="w-[256px]" is-invalid is-required name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <FieldError>Please enter a valid date</FieldError>
    </DateField>
    <DateField class="w-[256px]" is-invalid name="invalid-date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <FieldError>Date must be in the future</FieldError>
    </DateField>
  </div>
</template>

<script setup lang="ts">
import { DateField, FieldError, Label } from '@rysinal/heroui-vue'
</script>
