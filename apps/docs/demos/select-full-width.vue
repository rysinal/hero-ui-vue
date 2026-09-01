<template>
  <div class="w-[400px] space-y-4">
    <Select full-width placeholder="Select one">
      <Label>Favorite Animal</Label>
      <SelectTrigger>
        <SelectValue />
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox>
          <ListBoxItem
            v-for="animal in animals.slice(0, 3)"
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
  </div>
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
