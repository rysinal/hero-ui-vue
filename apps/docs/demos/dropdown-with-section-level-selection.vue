<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" variant="secondary">Filters</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover class="min-w-[240px]">
      <Dropdown.Menu v-model:selected-keys="selected" selection-mode="multiple">
        <Dropdown.Section title="Status">
          <Dropdown.Item v-for="s in statuses" :key="s" :value="s" :text-value="s">
            <Dropdown.ItemIndicator />
            <Label class="capitalize">{{ s }}</Label>
          </Dropdown.Item>
        </Dropdown.Section>
        <Dropdown.Section title="Priority">
          <Dropdown.Item v-for="p in priorities" :key="p" :value="p" :text-value="p">
            <Dropdown.ItemIndicator />
            <Label class="capitalize">{{ p }}</Label>
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'

const statuses = ['open', 'closed']
const priorities = ['high', 'low']
const selected = ref<Array<string | number>>(['open'])
</script>
