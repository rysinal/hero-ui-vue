<template>
  <Autocomplete
    v-model="selectedKeys"
    class="w-[256px]"
    placeholder="Select your teammates"
    selection-mode="multiple"
  >
    <Label>Users</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value>
        <template #default="{ defaultChildren, isPlaceholder, state }">
          <template v-if="isPlaceholder || state.selectedItems.length === 0">
            {{ defaultChildren }}
          </template>
          <TagGroup v-else size="sm" @remove="removeKey">
            <TagGroupList>
              <Tag
                v-for="item in state.selectedItems"
                v-show="userById(item.key)"
                :key="item.key"
                :value="item.key"
              >
                <Avatar class="size-4" size="sm">
                  <AvatarImage :src="userById(item.key)?.avatarUrl" />
                  <AvatarFallback>{{ userById(item.key)?.fallback }}</AvatarFallback>
                </Avatar>
                <span>{{ userById(item.key)?.name }}</span>
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
              <SearchFieldInput autofocus placeholder="Search users..." />
              <SearchFieldClearButton />
            </SearchFieldGroup>
          </SearchField>
          <ListBox>
            <ListBoxItem
              v-for="user in users"
              :key="user.id"
              :text-value="user.name"
              :value="user.id"
            >
              <Avatar size="sm">
                <AvatarImage :src="user.avatarUrl" />
                <AvatarFallback>{{ user.fallback }}</AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <Label>{{ user.name }}</Label>
                <Description>{{ user.email }}</Description>
              </div>
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
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { users } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKeys = ref<Array<string | number>>(['1', '2'])

const userById = (key: string | number) => users.find((user) => user.id === key)
const hasMatch = (inputValue: string) => users.some((user) => contains(user.name, inputValue))

const removeKey = (key: string | number) => {
  selectedKeys.value = selectedKeys.value.filter((selected) => selected !== key)
}
</script>
