<template>
  <div class="flex flex-col gap-3">
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Async table" class="min-w-[600px]">
          <Table.Header>
            <Table.Column is-row-header>Name</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Email</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row v-for="user in rows" :key="user.id">
              <Table.Cell>{{ user.name }}</Table.Cell>
              <Table.Cell>{{ user.role }}</Table.Cell>
              <Table.Cell>{{ user.email }}</Table.Cell>
            </Table.Row>
            <Table.LoadMore :colspan="3" :is-loading="isLoading">
              <div class="flex items-center justify-center gap-2 py-3">
                <Spinner class="size-4" />
                <span class="text-sm text-muted">Loading more...</span>
              </div>
            </Table.LoadMore>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
    <Button class="w-fit" size="sm" variant="secondary" :is-disabled="isLoading" @click="loadMore">
      Load more
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Spinner, Table } from '@rysinal/heroui-vue'
import { users, type TableUser } from './table-data'

const rows = ref<TableUser[]>(users.slice(0, 3))
const isLoading = ref(false)

const loadMore = () => {
  if (rows.value.length >= users.length) return
  isLoading.value = true
  setTimeout(() => {
    rows.value = users.slice(0, rows.value.length + 3)
    isLoading.value = false
  }, 800)
}
</script>
