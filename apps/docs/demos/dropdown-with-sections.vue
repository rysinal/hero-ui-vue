<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" is-icon-only variant="secondary">
        <DropdownIcon name="ellipsis" />
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Popover class="min-w-[280px]">
      <Dropdown.Menu>
        <Dropdown.Section title="Actions">
          <Dropdown.Item value="new-file" text-value="New file">
            <DropdownIcon name="plus" class="text-muted" />
            <div class="flex flex-col">
              <Label>New file</Label>
              <Description>Create a new file</Description>
            </div>
            <Kbd class="ms-auto" variant="light">
              <Kbd.Abbr key-value="command" /><Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item value="edit-file" text-value="Edit file">
            <DropdownIcon name="pencil" class="text-muted" />
            <div class="flex flex-col">
              <Label>Edit file</Label>
              <Description>Rename or move it</Description>
            </div>
          </Dropdown.Item>
        </Dropdown.Section>
        <Dropdown.Section title="Danger zone">
          <Dropdown.Item value="delete-file" text-value="Delete file" variant="danger">
            <DropdownIcon name="trash" />
            <Label>Delete file</Label>
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { Button, Description, Dropdown, Kbd, Label } from '@rysinal/heroui-vue'
import DropdownIcon from './dropdown-icons.vue'
</script>
