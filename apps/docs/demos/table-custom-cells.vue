<template>
  <Table>
    <Table.ScrollContainer>
      <Table.Content aria-label="Custom cells" class="min-w-[600px]">
        <Table.Header>
          <Table.Column is-row-header>Member</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row v-for="user in users.slice(0, 4)" :key="user.id">
            <Table.Cell>
              <div class="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>{{ user.name.charAt(0) }}</AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ user.name }}</span>
                  <span class="text-xs text-muted">{{ user.email }}</span>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>{{ user.role }}</Table.Cell>
            <Table.Cell>
              <Chip :color="user.status === 'Active' ? 'success' : 'default'" size="sm" variant="soft">
                {{ user.status }}
              </Chip>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, Chip, Table } from '@rysinal/heroui-vue'
import { users } from './table-data'
</script>
