<template>
  <!--
    The field already derives validity from min/max, so it hands `isInvalid` to
    the slot rather than having the demo recompute the bounds check.
  -->
  <div class="flex flex-col gap-4">
    <DateField
      v-slot="{ isInvalid }"
      v-model="value"
      :min-value="todayDate"
      class="w-[256px]"
      is-required
      name="date"
    >
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <FieldError v-if="isInvalid">Date must be today or in the future</FieldError>
      <Description v-else>Enter a date from today onwards</Description>
    </DateField>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { DateField, Description, FieldError, Label } from '@rysinal/heroui-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | null>(null)
const todayDate = today(getLocalTimeZone())
</script>
