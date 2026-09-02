<template>
  <Autocomplete
    class="w-[256px]"
    placeholder="Select one"
    selection-mode="single"
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
            <SearchFieldInput autofocus placeholder="Search states..." />
            <SearchFieldClearButton />
          </SearchFieldGroup>
        </SearchField>
        <ListBox>
          <EmptyState>No results found</EmptyState>
        </ListBox>
      </Autocomplete.Filter>
    </Autocomplete.Popover>
  </Autocomplete>
</template>

<script setup lang="ts">
import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
  useFilter,
} from '@rysinal/heroui-vue'

// An empty collection still opens the popover, so the empty state is what shows.
const { contains } = useFilter({ sensitivity: 'base' })
</script>
