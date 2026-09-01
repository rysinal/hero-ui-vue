<template>
  <div class="flex flex-col gap-3">
    <p class="text-sm text-muted">
      The React demo drives this table with TanStack Table. The same idea works in Vue with
      <code>@tanstack/vue-table</code>: keep the state in the adapter and let HeroUI render it.
      Below, a small hand-rolled model stands in so the demo has no extra dependency.
    </p>
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Data-driven table" class="min-w-[600px]">
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
            <Table.Row v-for="row in model.rows.value" :key="row.id">
              <Table.Cell v-for="column in columns" :key="column.id">
                {{ row[column.id] }}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table, type TableSortDescriptor } from '@rysinal/heroui-vue'
import { columns, users, type TableUser } from './table-data'

const sort = ref<TableSortDescriptor>()

const model = {
  rows: computed(() => {
    if (!sort.value) return users
    const key = sort.value.column as keyof TableUser
    const result = [...users].sort((a, b) => String(a[key]).localeCompare(String(b[key])))
    return sort.value.direction === 'descending' ? result.reverse() : result
  }),
}
</script>
