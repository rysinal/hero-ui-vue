<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" is-icon-only variant="secondary">
        <DropdownIcon name="ellipsis" />
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item value="new-file" text-value="New file">
          <DropdownIcon name="plus" class="text-muted" />
          <Label>New file</Label>
        </Dropdown.Item>
        <Dropdown.Item value="edit-file" text-value="Edit file">
          <DropdownIcon name="pencil" class="text-muted" />
          <Label>Edit file</Label>
        </Dropdown.Item>
        <Dropdown.Item value="delete-file" text-value="Delete file" variant="danger">
          <DropdownIcon name="trash" />
          <Label>Delete file</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'
import DropdownIcon from './dropdown-icons.vue'
</script>
