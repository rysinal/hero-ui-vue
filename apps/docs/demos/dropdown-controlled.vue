<template>
  <div class="flex flex-col gap-3">
    <p class="text-sm text-muted">
      Menu is <span class="font-medium">{{ isOpen ? 'open' : 'closed' }}</span>
    </p>
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
