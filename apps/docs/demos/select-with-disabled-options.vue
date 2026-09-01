<template>
  <Select
    class="w-[256px]"
    :disabled-keys="['cat', 'kangaroo']"
    placeholder="Select an animal"
  >
    <Label>Animal</Label>
    <SelectTrigger>
      <SelectValue />
      <SelectIndicator />
    </SelectTrigger>
    <SelectPopover>
      <ListBox>
        <ListBoxItem
          v-for="animal in animals"
          :key="animal.id"
          :text-value="animal.name"
          :value="animal.id"
        >
          {{ animal.name }}
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
import { animals } from './select-data'
</script>
