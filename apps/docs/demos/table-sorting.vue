<template>
  <Table v-model:sort-descriptor="sort">
    <Table.ScrollContainer>
      <Table.Content aria-label="Sortable table" class="min-w-[600px]">
        <Table.Header>
          <Table.Column
            v-for="column in columns"
            :id="column.id"
            :key="column.id"
            :is-row-header="column.id === 'name'"
            allows-sorting
          >
            {{ column.name }}
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row v-for="user in sorted" :key="user.id">
            <Table.Cell>{{ user.name }}</Table.Cell>
            <Table.Cell>{{ user.role }}</Table.Cell>
            <Table.Cell>{{ user.status }}</Table.Cell>
            <Table.Cell>{{ user.email }}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table, type TableSortDescriptor } from '@rysinal/heroui-vue'
import { columns, users, type TableUser } from './table-data'

const sort = ref<TableSortDescriptor>()

const sorted = computed(() => {
  if (!sort.value) return users
  const key = sort.value.column as keyof TableUser
  const result = [...users].sort((a, b) => String(a[key]).localeCompare(String(b[key])))
  return sort.value.direction === 'descending' ? result.reverse() : result
})
</script>
