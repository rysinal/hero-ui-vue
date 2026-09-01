<template>
  <form class="flex w-[256px] flex-col gap-4" novalidate @submit.prevent="handleSubmit">
    <Select
      v-model="selectedState"
      class="w-full"
      is-required
      :is-invalid="stateInvalid"
      name="state"
      placeholder="Select one"
    >
      <Label>State</Label>
      <SelectTrigger>
        <SelectValue />
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox>
          <ListBoxItem
            v-for="state in states"
            :key="state.id"
            :text-value="state.name"
            :value="state.id"
          >
            {{ state.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </SelectPopover>
      <FieldError v-if="stateInvalid">Please select a state.</FieldError>
    </Select>

    <Select
      v-model="selectedCountry"
      class="w-full"
      is-required
      :is-invalid="countryInvalid"
      name="country"
      placeholder="Select a country"
    >
      <Label>Country</Label>
      <SelectTrigger>
        <SelectValue />
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox>
          <ListBoxItem
            v-for="country in countries"
            :key="country.id"
            :text-value="country.name"
            :value="country.id"
          >
            {{ country.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </SelectPopover>
      <FieldError v-if="countryInvalid">Please select a country.</FieldError>
    </Select>

    <Button type="submit">Submit</Button>
  </form>
</template>

<script setup lang="ts">
/* global window */
import { computed, ref } from 'vue'
import {
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@rysinal/heroui-vue'
import { countries, states } from './select-data'

const submitted = ref(false)
const selectedState = ref<string | number | null>(null)
const selectedCountry = ref<string | number | null>(null)
const stateInvalid = computed(() => submitted.value && selectedState.value == null)
const countryInvalid = computed(() => submitted.value && selectedCountry.value == null)

const handleSubmit = () => {
  submitted.value = true
  if (stateInvalid.value || countryInvalid.value) return

  window.alert('Form submitted successfully!')
}
</script>
