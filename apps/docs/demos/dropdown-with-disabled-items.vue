<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" variant="secondary">Actions</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item value="new-file" text-value="New file">
          <Label>New file</Label>
        </Dropdown.Item>
        <Dropdown.Item is-disabled value="copy-link" text-value="Copy link">
          <Label>Copy link</Label>
        </Dropdown.Item>
        <Dropdown.Item is-disabled value="edit-file" text-value="Edit file">
          <Label>Edit file</Label>
        </Dropdown.Item>
        <Dropdown.Item value="delete-file" text-value="Delete file" variant="danger">
          <Label>Delete file</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'
</script>
