<template>
  <div class="flex flex-col gap-2">
    <p class="text-sm text-muted">
      Rendering {{ visible.length }} of {{ manyUsers.length }} rows; the rest mount as you scroll.
    </p>
    <Table>
      <Table.ScrollContainer
        ref="scroller"
        class="max-h-[320px] overflow-auto"
        @scroll="handleScroll"
      >
        <Table.Content aria-label="Virtualized table" class="min-w-[600px]">
          <Table.Header>
            <Table.Column is-row-header>Name</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Email</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row v-for="user in visible" :key="user.id">
              <Table.Cell>{{ user.name }}</Table.Cell>
              <Table.Cell>{{ user.role }}</Table.Cell>
              <Table.Cell>{{ user.email }}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table } from '@rysinal/heroui-vue'
import { users, type TableUser } from './table-data'

// Repeat the sample data to make the windowing visible.
const manyUsers: TableUser[] = Array.from({ length: 200 }, (_, index) => {
  const base = users[index % users.length]!
  return { ...base, id: index + 1, name: `${base.name} ${index + 1}` }
})

const count = ref(20)
const visible = computed(() => manyUsers.slice(0, count.value))

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 40) {
    count.value = Math.min(count.value + 20, manyUsers.length)
  }
}
</script>
