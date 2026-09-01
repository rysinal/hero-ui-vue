<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table, type TableSortDescriptor } from '../index'

const sort = ref<TableSortDescriptor>()

const people = [
  { id: 1, name: 'Kate', role: 'CEO' },
  { id: 2, name: 'Alan', role: 'CTO' },
  { id: 3, name: 'Zoe', role: 'CMO' },
]

const rows = computed(() => {
  if (!sort.value) return people
  const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name))
  return sort.value.direction === 'descending' ? sorted.reverse() : sorted
})
</script>

<template>
  <Table v-model:sort-descriptor="sort" :default-selected-keys="[2]" selection-mode="multiple">
    <Table.ScrollContainer>
      <Table.Content>
        <Table.Header>
          <Table.Column id="name" allows-sorting is-row-header>Name</Table.Column>
          <Table.Column id="role">Role</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row v-for="person in rows" :id="person.id" :key="person.id">
            <Table.Cell>{{ person.name }}</Table.Cell>
            <Table.Cell>{{ person.role }}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</template>
