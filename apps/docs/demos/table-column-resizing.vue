<template>
  <Table>
    <Table.ResizableContainer>
      <Table.Content aria-label="Resizable columns" class="min-w-[600px]">
        <Table.Header>
          <Table.Column :width="220" is-row-header>
            Name
            <Table.ColumnResizer />
          </Table.Column>
          <Table.Column :width="160">
            Role
            <Table.ColumnResizer />
          </Table.Column>
          <Table.Column>Email</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row v-for="user in users.slice(0, 4)" :key="user.id">
            <Table.Cell>{{ user.name }}</Table.Cell>
            <Table.Cell>{{ user.role }}</Table.Cell>
            <Table.Cell>{{ user.email }}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table.ResizableContainer>
  </Table>
</template>

<script setup lang="ts">
import { Table } from '@rysinal/heroui-vue'
import { users } from './table-data'
</script>
