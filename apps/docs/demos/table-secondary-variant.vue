<template>
  <Table variant="secondary">
    <Table.ScrollContainer>
      <Table.Content aria-label="Team members" class="min-w-[600px]">
        <Table.Header>
          <Table.Column v-for="column in columns" :key="column.id" :is-row-header="column.id === 'name'">
            {{ column.name }}
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row v-for="user in users.slice(0, 4)" :key="user.id">
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
import { Table } from '@rysinal/heroui-vue'
import { columns, users } from './table-data'
</script>
