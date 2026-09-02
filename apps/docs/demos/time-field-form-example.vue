<template>
  <Form class="flex w-[280px] flex-col gap-4" @submit.prevent="handleSubmit">
    <TimeField
      v-model="value"
      :is-invalid="isInvalid"
      :max-value="maxTime"
      :min-value="minTime"
      class="w-full"
      is-required
      name="time"
    >
      <Label>Appointment time</Label>
      <TimeField.Group>
        <TimeField.Prefix>
          <svg aria-hidden="true" class="size-4 text-muted" fill="none" viewBox="0 0 16 16">
            <path
              d="M8 4.5V8l2.5 1.5M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
          </svg>
        </TimeField.Prefix>
        <TimeField.Input v-slot="{ segments }">
          <TimeField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </TimeField.Input>
      </TimeField.Group>
      <FieldError v-if="isInvalid">Time must be between 9:00 AM and 5:00 PM</FieldError>
      <Description v-else>Enter a time between 9:00 AM and 5:00 PM</Description>
    </TimeField>
    <Button
      :is-disabled="!value || isInvalid"
      :is-pending="isSubmitting"
      class="w-full"
      type="submit"
      variant="primary"
    >
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </Button>
  </Form>
</template>

<script setup lang="ts">
/* global window */
import { computed, ref, shallowRef } from 'vue'
import {
  Button,
  Description,
  FieldError,
  Form,
  Label,
  TimeField,
  type TimeValue,
} from '@rysinal/heroui-vue'
import { parseTime } from '@internationalized/date'

const value = shallowRef<TimeValue | null>(null)
const isSubmitting = ref(false)
const minTime = parseTime('09:00')
const maxTime = parseTime('17:00')
const isInvalid = computed(
  () =>
    value.value !== null &&
    (value.value.compare(minTime) < 0 || value.value.compare(maxTime) > 0),
)

const handleSubmit = () => {
  if (!value.value || isInvalid.value) return

  isSubmitting.value = true
  window.setTimeout(() => {
    value.value = null
    isSubmitting.value = false
  }, 1500)
}
</script>
