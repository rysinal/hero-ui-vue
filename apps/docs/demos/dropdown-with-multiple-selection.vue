<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" variant="secondary">Preferred Fruits</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover class="min-w-[256px]">
      <Dropdown.Menu v-model:selected-keys="selected" selection-mode="multiple">
        <Dropdown.Section title="Select a fruit">
          <Dropdown.Item v-for="fruit in fruits" :key="fruit" :value="fruit" :text-value="fruit">
            <Dropdown.ItemIndicator />
            <Label class="capitalize">{{ fruit }}</Label>
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'

const fruits = ['apple', 'banana', 'cherry', 'grape']
const selected = ref<Array<string | number>>(['apple'])
</script>
