<template>
  <div class="flex flex-col gap-4">
    <DateField :model-value="todayDate" class="w-[256px]" is-disabled name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>This date field is disabled</Description>
    </DateField>
    <DateField class="w-[256px]" is-disabled name="date-empty">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <Description>This date field is disabled</Description>
    </DateField>
  </div>
</template>

<script setup lang="ts">
import { DateField, Description, Label } from '@rysinal/heroui-vue'
import { getLocalTimeZone, today } from '@internationalized/date'

const todayDate = today(getLocalTimeZone())
</script>
