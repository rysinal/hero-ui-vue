<template>
  <Autocomplete v-model="selectedKey" class="w-[256px]" placeholder="Select a country">
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
            <template v-for="(section, index) in visibleSections(inputValue)" :key="section.id">
              <ListBoxSection>
                <Header>{{ section.name }}</Header>
                <ListBoxItem
                  v-for="country in section.items"
                  :key="country.id"
                  :text-value="country.name"
                  :value="country.id"
                >
                  {{ country.name }}
                  <ListBoxItemIndicator />
                </ListBoxItem>
              </ListBoxSection>
              <Separator v-if="index < visibleSections(inputValue).length - 1" />
            </template>
            <EmptyState v-if="visibleSections(inputValue).length === 0">
              No results found
            </EmptyState>
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
  Header,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  ListBoxSection,
  Separator,
  useFilter,
  SearchField,
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
} from '@rysinal/heroui-vue'
import { countrySections } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKey = ref<string | number | null>(null)

/**
 * Items hide themselves once they stop matching, but their section header and
 * separator would linger — so empty sections are dropped up front.
 */
const visibleSections = (inputValue: string) =>
  countrySections.filter((section) =>
    section.items.some((country) => contains(country.name, inputValue)),
  )
</script>
