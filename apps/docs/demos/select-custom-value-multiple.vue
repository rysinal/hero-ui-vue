<template>
  <Select
    :default-value="['1', '2']"
    class="w-[256px]"
    placeholder="Select your teammates"
    selection-mode="multiple"
  >
    <Label>Users</Label>
    <SelectTrigger>
      <SelectValue class="flex flex-wrap gap-2">
        <template #default="{ defaultChildren, isPlaceholder, state }">
          <template v-if="isPlaceholder || state.selectedItems.length === 0">
            {{ defaultChildren }}
          </template>
          <template v-else>
            <Chip
              v-for="item in state.selectedItems"
              :key="item.key"
              variant="soft"
            >
              <Avatar class="size-4" size="sm">
                <AvatarImage :src="userById(item.key)?.avatarUrl" />
                <AvatarFallback>{{ userById(item.key)?.fallback }}</AvatarFallback>
              </Avatar>
              <ChipLabel>{{ userById(item.key)?.name ?? item.textValue }}</ChipLabel>
            </Chip>
          </template>
        </template>
      </SelectValue>
      <SelectIndicator />
    </SelectTrigger>
    <SelectPopover>
      <ListBox selection-mode="multiple">
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
      </ListBox>
    </SelectPopover>
  </Select>
</template>

<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Chip,
  ChipLabel,
  Description,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@rysinal/heroui-vue'
import { users } from './select-data'

const userById = (key: string | number) => users.find((user) => user.id === key)
</script>
