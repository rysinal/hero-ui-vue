<template>
  <Select v-model="selectedUserKey" class="w-[256px]" placeholder="Select a user">
    <Label>User</Label>
    <SelectTrigger>
      <SelectValue>
        <template #default="{ defaultChildren, isPlaceholder }">
          <template v-if="isPlaceholder || !selectedUser">
            {{ defaultChildren }}
          </template>
          <div v-else class="flex items-center gap-2">
            <Avatar class="size-4" size="sm">
              <AvatarImage :src="selectedUser.avatarUrl" />
              <AvatarFallback>{{ selectedUser.fallback }}</AvatarFallback>
            </Avatar>
            <span>{{ selectedUser.name }}</span>
          </div>
        </template>
      </SelectValue>
      <SelectIndicator />
    </SelectTrigger>
    <SelectPopover>
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
      </ListBox>
    </SelectPopover>
  </Select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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

const selectedUserKey = ref<string | number | null>(null)
const selectedUser = computed(() => users.find((user) => user.id === selectedUserKey.value))
</script>
