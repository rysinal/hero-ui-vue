<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" variant="secondary">Sort by</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover class="min-w-[220px]">
      <Dropdown.Menu v-model:selected-keys="selected" selection-mode="single">
        <Dropdown.Item v-for="option in options" :key="option" :value="option" :text-value="option">
          <Dropdown.ItemIndicator type="dot" />
          <Label class="capitalize">{{ option }}</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'

const options = ['newest', 'oldest', 'name']
const selected = ref<Array<string | number>>(['newest'])
</script>
