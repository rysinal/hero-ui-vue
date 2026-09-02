<template>
  <Autocomplete v-model="selectedKey" class="w-[256px]" placeholder="Search for a city">
    <Label>City</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value />
      <Autocomplete.ClearButton />
      <Autocomplete.Indicator />
    </Autocomplete.Trigger>
    <Autocomplete.Popover>
      <Autocomplete.Filter :filter="contains" @input-change="markSearching">
        <template #default="{ inputValue }">
          <SearchField variant="secondary">
            <SearchFieldGroup>
              <SearchFieldSearchIcon />
              <SearchFieldInput autofocus placeholder="Search cities..." />
              <SearchFieldClearButton />
            </SearchFieldGroup>
          </SearchField>
          <ListBox>
            <ListBoxItem
              v-for="city in cities"
              :key="city.name"
              :text-value="city.name"
              :value="city.name"
            >
              <div class="flex flex-col">
                <Label>{{ city.name }}</Label>
                <Description>{{ city.country }}</Description>
              </div>
              <ListBoxItemIndicator />
            </ListBoxItem>
            <EmptyState v-if="!hasMatch(inputValue)">
              {{ isSearching ? 'Searching...' : 'No cities found' }}
            </EmptyState>
          </ListBox>
        </template>
      </Autocomplete.Filter>
    </Autocomplete.Popover>
  </Autocomplete>
</template>

<script setup lang="ts">
/* global setTimeout, clearTimeout */
import { onBeforeUnmount, ref } from 'vue'
import {
  Autocomplete,
  Description,
  EmptyState,
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
import { cities } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKey = ref<string | number | null>(null)
const isSearching = ref(false)

let searchHandle: ReturnType<typeof setTimeout> | null = null

const hasMatch = (inputValue: string) => cities.some((city) => contains(city.name, inputValue))

/** Stands in for a network round trip so the empty state can show progress. */
const markSearching = (query: string) => {
  if (searchHandle) clearTimeout(searchHandle)
  if (!query) {
    isSearching.value = false
    return
  }

  isSearching.value = true
  searchHandle = setTimeout(() => {
    isSearching.value = false
  }, 300)
}

onBeforeUnmount(() => {
  if (searchHandle) clearTimeout(searchHandle)
})
</script>
