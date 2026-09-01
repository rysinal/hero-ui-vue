<template>
  <div class="flex flex-col gap-4">
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Paginated table" class="min-w-[600px]">
          <Table.Header>
            <Table.Column v-for="column in columns" :key="column.id" :is-row-header="column.id === 'name'">
              {{ column.name }}
            </Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row v-for="user in pageRows" :key="user.id">
              <Table.Cell>{{ user.name }}</Table.Cell>
              <Table.Cell>{{ user.role }}</Table.Cell>
              <Table.Cell>{{ user.status }}</Table.Cell>
              <Table.Cell>{{ user.email }}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
    <Pagination v-model:page="page" :total="totalPages" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination, Table } from '@rysinal/heroui-vue'
import { columns, users } from './table-data'

const pageSize = 3
const page = ref(1)
const totalPages = computed(() => Math.ceil(users.length / pageSize))
const pageRows = computed(() => users.slice((page.value - 1) * pageSize, page.value * pageSize))
</script>
