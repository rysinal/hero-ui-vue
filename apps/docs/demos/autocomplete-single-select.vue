<template>
  <Autocomplete
    v-model="selectedKey"
    class="w-[256px]"
    placeholder="Select an animal"
    selection-mode="single"
  >
    <Label>Favorite Animal</Label>
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
              <SearchFieldInput autofocus placeholder="Search animals..." />
              <SearchFieldClearButton />
            </SearchFieldGroup>
          </SearchField>
          <ListBox>
            <ListBoxItem
              v-for="animal in animals"
              :key="animal.id"
              :text-value="animal.name"
              :value="animal.id"
            >
              {{ animal.name }}
              <ListBoxItemIndicator />
            </ListBoxItem>
            <EmptyState v-if="!hasMatch(inputValue)">No results found</EmptyState>
          </ListBox>
        </template>
      </Autocomplete.Filter>
    </Autocomplete.Popover>
  </Autocomplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Autocomplete,
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
import { animals } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKey = ref<string | number | null>(null)

const hasMatch = (inputValue: string) => animals.some((animal) => contains(animal.name, inputValue))
</script>
