<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" variant="secondary">File</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover class="min-w-[260px]">
      <Dropdown.Menu>
        <Dropdown.Item v-for="entry in entries" :key="entry.value" :value="entry.value" :text-value="entry.label">
          <Label>{{ entry.label }}</Label>
          <Kbd class="ms-auto" variant="light">
            <Kbd.Abbr key-value="command" /><Kbd.Content>{{ entry.key }}</Kbd.Content>
          </Kbd>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { Button, Dropdown, Kbd, Label } from '@rysinal/heroui-vue'

const entries = [
  { key: 'N', label: 'New file', value: 'new' },
  { key: 'O', label: 'Open', value: 'open' },
  { key: 'S', label: 'Save', value: 'save' },
]
</script>
