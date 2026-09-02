<script setup lang="ts">
import { useFilter } from '../../../composables'
import { Label } from '../../label'
import { ListBox, ListBoxItem, ListBoxItemIndicator } from '../../list-box'
import { SearchField, SearchFieldGroup, SearchFieldInput } from '../../search-field'
import { Autocomplete } from '../index'
import type { SelectKey, SelectSelectionMode } from '../../select/context'

interface FilterableAutocompleteProps {
  /** Turn off to prove a bare popover leaves every item visible. */
  filtered?: boolean
  modelValue?: SelectKey | SelectKey[] | null
  selectionMode?: SelectSelectionMode
  withClearButton?: boolean
  withCustomIndicator?: boolean
}

const props = withDefaults(defineProps<FilterableAutocompleteProps>(), {
  filtered: true,
  modelValue: undefined,
  selectionMode: 'single',
  withClearButton: false,
  withCustomIndicator: false,
})

defineEmits<{
  clear: []
  'update:modelValue': [value: SelectKey | SelectKey[] | null]
}>()

const { contains } = useFilter({ sensitivity: 'base' })

const states = [
  { id: 'florida', name: 'Florida' },
  { id: 'delaware', name: 'Delaware' },
  { id: 'california', name: 'California' },
]
</script>

<template>
  <Autocomplete
    :model-value="props.modelValue"
    :selection-mode="props.selectionMode"
    placeholder="Select one"
    @clear="$emit('clear')"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <Label>State</Label>
    <Autocomplete.Trigger data-test="trigger">
      <Autocomplete.Value data-test="value">
        <template #default="{ defaultChildren, state }">
          <span data-test="count">{{ state.selectedItems.length }}</span>
          <span data-test="labels">
            {{ state.selectedItems.map((item) => item.textValue).join('|') }}
          </span>
          <span data-test="default-children">{{ defaultChildren }}</span>
        </template>
      </Autocomplete.Value>
      <Autocomplete.ClearButton v-if="props.withClearButton" data-test="clear" />
      <Autocomplete.Indicator>
        <svg v-if="props.withCustomIndicator" data-test="custom-icon" viewBox="0 0 16 16" />
      </Autocomplete.Indicator>
    </Autocomplete.Trigger>
    <Autocomplete.Popover portal-container="#autocomplete-portal">
      <Autocomplete.Filter :filter="props.filtered ? contains : undefined">
        <SearchField variant="secondary">
          <SearchFieldGroup>
            <SearchFieldInput placeholder="Search..." />
          </SearchFieldGroup>
        </SearchField>
        <ListBox>
          <ListBoxItem
            v-for="state in states"
            :key="state.id"
            :data-test="'option-' + state.id"
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
</template>
