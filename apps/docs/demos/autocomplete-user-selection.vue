<template>
  <Autocomplete v-model="selectedKey" class="w-[256px]" placeholder="Select a user">
    <Label>User</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value>
        <template #default="{ defaultChildren, isPlaceholder, state }">
          <template v-if="isPlaceholder || state.selectedItems.length === 0">
            {{ defaultChildren }}
          </template>
          <template v-else-if="state.selectedItems.length > 1">
            {{ state.selectedItems.length }} users selected
          </template>
          <div v-else-if="userById(state.selectedItems[0].key)" class="flex items-center gap-2">
            <Avatar class="size-4" size="sm">
              <AvatarImage :src="userById(state.selectedItems[0].key)?.avatarUrl" />
              <AvatarFallback>{{ userById(state.selectedItems[0].key)?.fallback }}</AvatarFallback>
            </Avatar>
            <span>{{ userById(state.selectedItems[0].key)?.name }}</span>
          </div>
          <template v-else>
            {{ defaultChildren }}
          </template>
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
  useFilter,
} from '@rysinal/heroui-vue'
import { users } from './autocomplete-data'

const { contains } = useFilter({ sensitivity: 'base' })
const selectedKey = ref<string | number | null>(null)

const userById = (key: string | number) => users.find((user) => user.id === key)
const hasMatch = (inputValue: string) => users.some((user) => contains(user.name, inputValue))
</script>
