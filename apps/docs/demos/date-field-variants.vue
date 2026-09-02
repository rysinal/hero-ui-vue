<template>
  <div class="flex flex-col gap-4">
    <DateField class="w-[256px]" name="primary-date">
      <Label>Primary variant</Label>
      <DateField.Group variant="primary">
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
    </DateField>
    <DateField class="w-[256px]" name="secondary-date">
      <Label>Secondary variant</Label>
      <DateField.Group variant="secondary">
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
    </DateField>
  </div>
</template>

<script setup lang="ts">
import { DateField, Label } from '@rysinal/heroui-vue'
</script>
