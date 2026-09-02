<template>
  <div class="flex flex-col gap-4">
    <Autocomplete
      class="w-[256px]"
      default-value="california"
      is-disabled
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
          <SearchField variant="secondary">
            <SearchFieldGroup>
              <SearchFieldSearchIcon />
              <SearchFieldInput placeholder="Search states..." />
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
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>

    <Autocomplete
      :default-value="['argentina', 'japan', 'france']"
      class="w-[256px]"
      is-disabled
      placeholder="Select countries"
      selection-mode="multiple"
    >
      <Label>Countries to Visit</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter :filter="contains">
          <SearchField variant="secondary">
            <SearchFieldGroup>
              <SearchFieldSearchIcon />
              <SearchFieldInput placeholder="Search countries..." />
              <SearchFieldClearButton />
            </SearchFieldGroup>
          </SearchField>
          <ListBox>
            <ListBoxItem
              v-for="country in travelCountries"
              :key="country.id"
              :text-value="country.name"
              :value="country.id"
            >
              {{ country.name }}
              <ListBoxItemIndicator />
            </ListBoxItem>
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  </div>
</template>

<script setup lang="ts">
import {
  Autocomplete,
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
import { states, travelCountries } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
</script>
