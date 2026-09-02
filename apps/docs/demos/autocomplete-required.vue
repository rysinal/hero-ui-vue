<template>
  <form class="flex w-[256px] flex-col gap-4" novalidate @submit.prevent="handleSubmit">
    <Autocomplete
      v-model="selectedState"
      :is-invalid="stateInvalid"
      class="w-full"
      is-required
      name="state"
      placeholder="Select one"
    >
      <Label>State</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter :filter="contains">
          <template #default="{ inputValue }">
            <SearchField variant="secondary">
              <SearchFieldGroup>
                <SearchFieldSearchIcon />
                <SearchFieldInput autofocus placeholder="Search states..." />
                <SearchFieldClearButton />
              </SearchFieldGroup>
            </SearchField>
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
              <EmptyState v-if="!hasStateMatch(inputValue)">No results found</EmptyState>
            </ListBox>
          </template>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
      <FieldError v-if="stateInvalid">Please select a state.</FieldError>
    </Autocomplete>

    <Autocomplete
      v-model="selectedCountry"
      :is-invalid="countryInvalid"
      class="w-full"
      is-required
      name="country"
      placeholder="Select a country"
    >
      <Label>Country</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter :filter="contains">
          <template #default="{ inputValue }">
            <SearchField variant="secondary">
              <SearchFieldGroup>
                <SearchFieldSearchIcon />
                <SearchFieldInput autofocus placeholder="Search countries..." />
                <SearchFieldClearButton />
              </SearchFieldGroup>
            </SearchField>
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
              <EmptyState v-if="!hasCountryMatch(inputValue)">No results found</EmptyState>
            </ListBox>
          </template>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
      <FieldError v-if="countryInvalid">Please select a country.</FieldError>
    </Autocomplete>

    <Button type="submit">Submit</Button>
  </form>
</template>

<script setup lang="ts">
/* global window */
import { computed, ref } from 'vue'
import {
  Autocomplete,
  Button,
  EmptyState,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  SearchField,
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
  useFilter,
} from '@rysinal/heroui-vue'
import { countries, states } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const submitted = ref(false)
const selectedState = ref<string | number | null>(null)
const selectedCountry = ref<string | number | null>(null)
const stateInvalid = computed(() => submitted.value && selectedState.value == null)
const countryInvalid = computed(() => submitted.value && selectedCountry.value == null)

const hasStateMatch = (inputValue: string) =>
  states.some((state) => contains(state.name, inputValue))
const hasCountryMatch = (inputValue: string) =>
  countries.some((country) => contains(country.name, inputValue))

const handleSubmit = () => {
  submitted.value = true
  if (stateInvalid.value || countryInvalid.value) return

  window.alert('Form submitted successfully!')
}
</script>
