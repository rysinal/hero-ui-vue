<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" variant="secondary">Share</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item value="copy-link" text-value="Copy Link">
          <Label>Copy Link</Label>
        </Dropdown.Item>
        <Dropdown.SubmenuTrigger>
          <template #trigger>
            <Dropdown.Item value="other" text-value="Other">
              <Label>Other</Label>
              <Dropdown.SubmenuIndicator>
                <DropdownIcon name="share" />
              </Dropdown.SubmenuIndicator>
            </Dropdown.Item>
          </template>
          <Dropdown.Item value="whatsapp" text-value="WhatsApp">
            <Label>WhatsApp</Label>
          </Dropdown.Item>
        </Dropdown.SubmenuTrigger>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'
import DropdownIcon from './dropdown-icons.vue'
</script>
