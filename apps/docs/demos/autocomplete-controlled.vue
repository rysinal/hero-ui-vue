<template>
  <div class="space-y-2">
    <Autocomplete v-model="selectedKey" class="w-[256px]" placeholder="Select a state">
      <Label>State (controlled)</Label>
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
                v-for="state in extendedStates"
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
    <p class="text-sm text-muted">Selected: {{ selectedName }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
import { extendedStates } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKey = ref<string | number | null>('california')

const selectedName = computed(
  () => extendedStates.find((state) => state.id === selectedKey.value)?.name ?? 'None',
)

const hasMatch = (inputValue: string) =>
  extendedStates.some((state) => contains(state.name, inputValue))
</script>
