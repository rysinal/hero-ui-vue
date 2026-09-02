<template>
  <div class="flex flex-col gap-4">
    <DateField v-model="value" class="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>Current value: {{ value ? value.toString() : '(empty)' }}</Description>
    </DateField>
    <div class="flex gap-2">
      <Button variant="tertiary" @click="value = today(getLocalTimeZone())">Set today</Button>
      <Button variant="tertiary" @click="value = null">Clear</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Button, DateField, Description, Label } from '@rysinal/heroui-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | null>(null)
</script>
