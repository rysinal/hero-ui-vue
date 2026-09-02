<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { shallowRef } from 'vue'
import { Label } from '../../label'
import { DateField } from '../index'

const value = shallowRef(new CalendarDate(2026, 9, 5))
</script>

<template>
  <DateField v-model="value" name="date">
    <Label>Date</Label>
    <DateField.Group>
      <DateField.Input v-slot="{ segments }">
        <DateField.Segment
          v-for="(segment, index) in segments"
          :key="index"
          :segment="segment"
        />
      </DateField.Input>
    </DateField.Group>
  </DateField>
</template>
