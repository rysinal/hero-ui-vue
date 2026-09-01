<template>
  <Select class="w-[256px]" placeholder="Select one">
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
    <Description>Select your state of residence</Description>
  </Select>
</template>

<script setup lang="ts">
import {
  Description,
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
