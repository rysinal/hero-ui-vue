<template>
  <!--
    Vue has no `render` prop: the parts expose their state through slot props
    instead, so a demo customises by reading `value` / `segments` from the slot.
  -->
  <DateField v-slot="{ value }" v-model="date" class="w-[256px]" name="date">
    <Label>Date</Label>
    <DateField.Group>
      <DateField.Input v-slot="{ segments }">
        <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </DateField.Input>
      <DateField.Suffix>
        <span class="text-xs text-muted">{{ value ? 'set' : '—' }}</span>
      </DateField.Suffix>
    </DateField.Group>
  </DateField>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { DateField, Label } from '@rysinal/heroui-vue'
import { parseDate, type DateValue } from '@internationalized/date'

const date = shallowRef<DateValue | null>(parseDate('2025-02-03'))
</script>
