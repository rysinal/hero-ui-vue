<template>
  <!--
    Vue has no `render` prop: the parts expose their state through slot props
    instead, so a demo customises by reading `value` / `segments` from the slot.
  -->
  <TimeField v-slot="{ value }" v-model="time" class="w-[256px]" name="time">
    <Label>Time</Label>
    <TimeField.Group>
      <TimeField.Input v-slot="{ segments }">
        <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
      </TimeField.Input>
      <TimeField.Suffix>
        <span class="text-xs text-muted">{{ value ? 'set' : '—' }}</span>
      </TimeField.Suffix>
    </TimeField.Group>
  </TimeField>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Label, TimeField, type TimeValue } from '@rysinal/heroui-vue'
import { parseTime } from '@internationalized/date'

const time = shallowRef<TimeValue | null>(parseTime('09:45'))
</script>
