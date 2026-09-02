<template>
  <Surface class="w-[380px] space-y-4 rounded-3xl p-6">
    <Autocomplete
      v-model="selectedKey"
      full-width
      placeholder="Select one"
      variant="secondary"
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
              <EmptyState v-if="!hasMatch(inputValue)">No results found</EmptyState>
            </ListBox>
          </template>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  </Surface>
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
  Surface,
  useFilter,
} from '@rysinal/heroui-vue'
import { states } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKey = ref<string | number | null>(null)

const hasMatch = (inputValue: string) => states.some((state) => contains(state.name, inputValue))
</script>
