<template>
  <Autocomplete
    v-model="selectedKeys"
    class="w-[256px]"
    placeholder="Select states"
    selection-mode="multiple"
  >
    <Label>States to Visit</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value>
        <template #default="{ defaultChildren, isPlaceholder, state }">
          <template v-if="isPlaceholder || state.selectedItems.length === 0">
            {{ defaultChildren }}
          </template>
          <TagGroup v-else size="sm" @remove="removeKey">
            <TagGroupList>
              <Tag v-for="item in state.selectedItems" :key="item.key" :value="item.key">
                {{ item.textValue }}
                <TagRemoveButton />
              </Tag>
            </TagGroupList>
          </TagGroup>
        </template>
      </Autocomplete.Value>
      <Autocomplete.Indicator />
    </Autocomplete.Trigger>
    <Autocomplete.Popover>
      <Autocomplete.Filter :filter="contains">
        <template #default="{ inputValue }">
          <SearchField variant="secondary">
            <SearchFieldGroup>
              <SearchFieldSearchIcon />
              <SearchFieldInput autofocus placeholder="Search..." />
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
  Tag,
  TagGroup,
  TagGroupList,
  TagRemoveButton,
  useFilter,
} from '@rysinal/heroui-vue'
import { states } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKeys = ref<Array<string | number>>([])

const hasMatch = (inputValue: string) => states.some((state) => contains(state.name, inputValue))

const removeKey = (key: string | number) => {
  selectedKeys.value = selectedKeys.value.filter((selected) => selected !== key)
}
</script>
