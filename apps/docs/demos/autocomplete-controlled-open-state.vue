<template>
  <div class="space-y-4">
    <Autocomplete
      :is-open="isOpen"
      class="w-[256px]"
      placeholder="Select one"
      @open-change="isOpen = $event"
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
    <Button @click="isOpen = !isOpen">{{ isOpen ? 'Close' : 'Open' }} Autocomplete</Button>
    <p class="text-sm text-muted">Autocomplete is {{ isOpen ? 'open' : 'closed' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Autocomplete,
  Button,
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
import { states } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const isOpen = ref(false)

const hasMatch = (inputValue: string) => states.some((state) => contains(state.name, inputValue))
</script>
