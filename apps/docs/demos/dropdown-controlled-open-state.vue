<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-2">
      <Button size="sm" variant="secondary" @click="isOpen = true">Open</Button>
      <Button size="sm" variant="tertiary" @click="isOpen = false">Close</Button>
    </div>
    <Dropdown v-model:is-open="isOpen">
      <Dropdown.Trigger>
        <Button aria-label="Menu" variant="secondary">Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item value="new" text-value="New file"><Label>New file</Label></Dropdown.Item>
          <Dropdown.Item value="copy" text-value="Copy link"><Label>Copy link</Label></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'

const isOpen = ref(false)
</script>
