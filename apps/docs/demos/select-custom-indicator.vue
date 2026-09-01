<template>
  <Select class="w-[256px]" placeholder="Select one">
    <Label>State</Label>
    <SelectTrigger>
      <SelectValue />
      <SelectIndicator class="size-3">
        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
          <path
            d="M5 3.5 8 1l3 2.5M5 12.5 8 15l3-2.5"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </SelectIndicator>
    </SelectTrigger>
    <SelectPopover>
      <ListBox>
        <ListBoxItem
          v-for="state in states"
          :key="state.id"
          :text-value="state.name"
          :value="state.id"
        >
          {{ state.name }}
          <ListBoxItemIndicator />
        </ListBoxItem>
      </ListBox>
    </SelectPopover>
  </Select>
</template>

<script setup lang="ts">
import {
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@rysinal/heroui-vue'
import { states } from './select-data'
</script>
