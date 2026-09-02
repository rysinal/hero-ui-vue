<template>
  <div class="flex flex-col gap-4">
    <TimeField :model-value="timeValue" class="w-[256px]" is-disabled name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>This time field is disabled</Description>
    </TimeField>
    <TimeField class="w-[256px]" is-disabled name="time-empty">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <Description>This time field is disabled</Description>
    </TimeField>
  </div>
</template>

<script setup lang="ts">
import { Description, Label, TimeField } from '@rysinal/heroui-vue'
import { getLocalTimeZone, now, Time } from '@internationalized/date'

const currentTime = now(getLocalTimeZone())
const timeValue = new Time(currentTime.hour, currentTime.minute, currentTime.second)
</script>
