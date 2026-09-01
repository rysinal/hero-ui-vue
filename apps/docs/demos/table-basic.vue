<template>
  <Table>
    <Table.ScrollContainer>
      <Table.Content aria-label="Team members" class="min-w-[600px]">
        <Table.Header>
          <Table.Column is-row-header>Name</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Email</Table.Column>
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
import { users } from './table-data'
</script>
