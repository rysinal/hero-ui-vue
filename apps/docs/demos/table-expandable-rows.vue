<template>
  <Table>
    <Table.ScrollContainer>
      <Table.Content aria-label="Expandable rows" class="min-w-[600px]">
        <Table.Header>
          <Table.Column is-row-header>Name</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          <template v-for="user in users.slice(0, 4)" :key="user.id">
            <Table.Row class="cursor-pointer" @click="toggle(user.id)">
              <Table.Cell>
                <span class="mr-2 inline-block" :class="expanded.includes(user.id) ? 'rotate-90' : ''">›</span>
                {{ user.name }}
              </Table.Cell>
              <Table.Cell>{{ user.role }}</Table.Cell>
              <Table.Cell>{{ user.status }}</Table.Cell>
            </Table.Row>
            <Table.Row v-if="expanded.includes(user.id)">
              <Table.Cell :colspan="3">
                <div class="py-2 text-sm text-muted">
                  {{ user.name }} can be reached at {{ user.email }}.
                </div>
              </Table.Cell>
            </Table.Row>
          </template>
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@rysinal/heroui-vue'
import { users } from './table-data'

const expanded = ref<number[]>([])

const toggle = (id: number) => {
  expanded.value = expanded.value.includes(id)
    ? expanded.value.filter((item) => item !== id)
    : [...expanded.value, id]
}
</script>
