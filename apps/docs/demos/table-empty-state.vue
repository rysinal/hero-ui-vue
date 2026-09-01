<template>
  <Table class="min-h-[200px]">
    <Table.ScrollContainer>
      <Table.Content aria-label="Empty table" class="h-full min-w-[600px]">
        <Table.Header>
          <Table.Column v-for="column in columns" :key="column.id" :is-row-header="column.id === 'name'">
            {{ column.name }}
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell :colspan="columns.length">
              <EmptyState class="flex w-full flex-col items-center justify-center gap-2 py-10 text-center">
                <span class="text-sm text-muted">No results found</span>
              </EmptyState>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</template>

<script setup lang="ts">
import { EmptyState, Table } from '@rysinal/heroui-vue'
import { columns } from './table-data'
</script>
