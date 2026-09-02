<template>
  <Form class="flex w-[280px] flex-col gap-4" @submit.prevent="handleSubmit">
    <DateField
      v-model="value"
      :is-invalid="isInvalid"
      :min-value="todayDate"
      class="w-full"
      is-required
      name="date"
    >
      <Label>Appointment date</Label>
      <DateField.Group>
        <DateField.Prefix>
          <svg aria-hidden="true" class="size-4 text-muted" fill="none" viewBox="0 0 16 16">
            <path
              d="M5.5 1.75v2M10.5 1.75v2M2.25 6.25h11.5M3.75 3.25h8.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-8.5a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
          </svg>
        </DateField.Prefix>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <FieldError v-if="isInvalid">Date must be today or in the future</FieldError>
      <Description v-else>Enter a date from today onwards</Description>
    </DateField>
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
import { Button, DateField, Description, FieldError, Form, Label } from '@rysinal/heroui-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | null>(null)
const isSubmitting = ref(false)
const todayDate = today(getLocalTimeZone())
const isInvalid = computed(() => value.value !== null && value.value.compare(todayDate) < 0)

const handleSubmit = () => {
  if (!value.value || isInvalid.value) return

  isSubmitting.value = true
  window.setTimeout(() => {
    value.value = null
    isSubmitting.value = false
  }, 1500)
}
</script>
