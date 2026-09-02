<template>
  <div class="flex flex-col gap-4">
    <TimeField v-model="value" class="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>Current value: {{ value ? value.toString() : '(empty)' }}</Description>
    </TimeField>
    <div class="flex gap-2">
      <Button variant="tertiary" @click="setNow">Set now</Button>
      <Button variant="tertiary" @click="value = null">Clear</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Button, Description, Label, TimeField, type TimeValue } from '@rysinal/heroui-vue'
import { getLocalTimeZone, now, Time } from '@internationalized/date'

const value = shallowRef<TimeValue | null>(null)

const setNow = () => {
  const currentTime = now(getLocalTimeZone())

  value.value = new Time(currentTime.hour, currentTime.minute, currentTime.second)
}
</script>
