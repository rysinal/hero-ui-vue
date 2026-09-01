<template>
  <Select as="div" class="w-[256px]" data-custom="foo" placeholder="Select one">
    <Label>State</Label>
    <SelectTrigger>
      <SelectValue />
      <SelectIndicator />
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
