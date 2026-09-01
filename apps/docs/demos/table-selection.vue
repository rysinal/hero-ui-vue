<template>
  <div class="flex flex-col gap-3">
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          v-model:selected-keys="selectedKeys"
          aria-label="Table with selection"
          class="min-w-[600px]"
          selection-mode="multiple"
        >
          <Table.Header>
            <Table.Column v-for="column in columns" :key="column.id" :is-row-header="column.id === 'name'">
              {{ column.name }}
            </Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row v-for="user in users.slice(0, 4)" :id="user.id" :key="user.id">
              <Table.Cell>{{ user.name }}</Table.Cell>
              <Table.Cell>{{ user.role }}</Table.Cell>
              <Table.Cell>{{ user.status }}</Table.Cell>
              <Table.Cell>{{ user.email }}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
    <p class="text-sm text-muted">
      Selected: {{ selectedKeys.length ? selectedKeys.join(', ') : 'none' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table, type TableKey } from '@rysinal/heroui-vue'
import { columns, users } from './table-data'

const selectedKeys = ref<TableKey[]>([])
</script>
