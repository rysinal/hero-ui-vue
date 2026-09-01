<template>
  <div class="flex flex-col gap-3">
    <Dropdown>
      <Dropdown.Trigger>
        <Button aria-label="Menu" variant="secondary">View: {{ selected[0] ?? 'none' }}</Button>
      </Dropdown.Trigger>
      <Dropdown.Popover class="min-w-[220px]">
        <Dropdown.Menu v-model:selected-keys="selected" selection-mode="single">
          <Dropdown.Item value="list" text-value="List">
            <Dropdown.ItemIndicator />
            <Label>List</Label>
          </Dropdown.Item>
          <Dropdown.Item value="grid" text-value="Grid">
            <Dropdown.ItemIndicator />
            <Label>Grid</Label>
          </Dropdown.Item>
          <Dropdown.Item value="gallery" text-value="Gallery">
            <Dropdown.ItemIndicator />
            <Label>Gallery</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'

const selected = ref<Array<string | number>>(['list'])
</script>
