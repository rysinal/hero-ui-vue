<template>
  <div class="demo-tag-group-list-data">
    <TagGroup
      v-model:selected-keys="selectedKeys"
      selection-mode="multiple"
      @remove="list.remove($event)"
    >
      <Label>Team Members</Label>
      <EmptyState v-if="list.items.value.length === 0" class="p-1">No team members</EmptyState>
      <Tag
        v-for="member in list.items.value"
        v-else
        :key="member.id"
        :value="member.id"
        :text-value="member.name"
        variant="surface"
      >
        <Avatar class="demo-tag-group-avatar" size="sm">
          <AvatarImage :src="member.avatar" :alt="member.name" />
          <AvatarFallback>{{ member.fallback }}</AvatarFallback>
        </Avatar>
        {{ member.name }}
        <TagRemoveButton />
      </Tag>
      <Description>Select team members for your project</Description>
    </TagGroup>

    <div v-if="selectedMembers.length" class="demo-tag-group-selected">
      <p>Selected:</p>
      <div class="demo-tag-group-selected__list">
        <div
          v-for="member in selectedMembers"
          :key="`${member.id}-selected`"
          class="demo-tag-group-selected__item"
        >
          <Avatar class="demo-tag-group-avatar" size="sm">
            <AvatarImage :src="member.avatar" :alt="member.name" />
            <AvatarFallback>{{ member.fallback }}</AvatarFallback>
          </Avatar>
          <span>{{ member.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Description,
  EmptyState,
  Label,
  Tag,
  TagGroup,
  TagRemoveButton,
  useListData,
} from '@rysinal/heroui-vue'

interface User {
  id: string
  name: string
  avatar: string
  fallback: string
}

const list = useListData<User>({
  getKey: (item) => item.id,
  initialItems: [
    { avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg', fallback: 'F', id: 'fred', name: 'Fred' },
    { avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg', fallback: 'M', id: 'michael', name: 'Michael' },
    { avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg', fallback: 'J', id: 'jane', name: 'Jane' },
    { avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg', fallback: 'A', id: 'alice', name: 'Alice' },
    { avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg', fallback: 'B', id: 'bob', name: 'Bob' },
    { avatar: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg', fallback: 'C', id: 'charlie', name: 'Charlie' },
  ],
  initialSelectedKeys: ['fred', 'michael'],
})

// TagGroup works with an array of keys; useListData tracks a Set.
const selectedKeys = computed({
  get: () => (list.selectedKeys.value === 'all' ? [] : [...list.selectedKeys.value]),
  set: (keys) => list.setSelectedKeys(new Set(keys)),
})

const selectedMembers = computed(() =>
  selectedKeys.value
    .map((key) => list.getItem(key))
    .filter((member): member is User => member !== undefined),
)
</script>

<style lang="less">
.demo-tag-group-list-data {
  width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.demo-tag-group-avatar {
  width: 1rem;
  height: 1rem;

  [data-slot="avatar-fallback"] {
    font-size: 0.625rem;
  }
}

.demo-tag-group-selected {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;

  p {
    margin: 0;
    color: var(--color-muted);
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.demo-tag-group-selected__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.demo-tag-group-selected__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--color-surface-tertiary);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>
