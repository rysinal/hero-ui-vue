<template>
  <Autocomplete
    v-model="selectedKeys"
    class="w-[256px]"
    placeholder="Add recipients"
    selection-mode="multiple"
  >
    <Label>To</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value>
        <template #default="{ defaultChildren, isPlaceholder, state }">
          <template v-if="isPlaceholder || state.selectedItems.length === 0">
            {{ defaultChildren }}
          </template>
          <TagGroup v-else size="sm" @remove="removeKey">
            <TagGroupList>
              <Tag v-for="item in state.selectedItems" :key="item.key" :value="item.key">
                {{ item.key }}
                <TagRemoveButton />
              </Tag>
            </TagGroupList>
          </TagGroup>
        </template>
      </Autocomplete.Value>
      <Autocomplete.ClearButton />
      <Autocomplete.Indicator />
    </Autocomplete.Trigger>
    <Autocomplete.Popover>
      <Autocomplete.Filter :filter="contains">
        <template #default="{ inputValue }">
          <SearchField variant="secondary">
            <SearchFieldGroup>
              <SearchFieldSearchIcon />
              <SearchFieldInput autofocus placeholder="Search emails..." />
              <SearchFieldClearButton />
            </SearchFieldGroup>
          </SearchField>
          <ListBox>
            <ListBoxItem
              v-for="recipient in emails"
              :key="recipient.id"
              :text-value="recipient.email"
              :value="recipient.id"
            >
              <div class="flex flex-col">
                <Label>{{ recipient.name }}</Label>
                <Description>{{ recipient.email }}</Description>
              </div>
              <ListBoxItemIndicator />
            </ListBoxItem>
            <EmptyState v-if="!hasMatch(inputValue)">No recipients found</EmptyState>
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
  Tag,
  TagGroup,
  TagGroupList,
  TagRemoveButton,
  useFilter,
} from '@rysinal/heroui-vue'
import { emails } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKeys = ref<Array<string | number>>([])

const hasMatch = (inputValue: string) =>
  emails.some((recipient) => contains(recipient.email, inputValue))

const removeKey = (key: string | number) => {
  selectedKeys.value = selectedKeys.value.filter((selected) => selected !== key)
}
</script>
