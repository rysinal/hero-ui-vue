<template>
  <Select class="w-[256px]" placeholder="Select countries" selection-mode="multiple">
    <Label>Countries to Visit</Label>
    <SelectTrigger>
      <SelectValue />
      <SelectIndicator />
    </SelectTrigger>
    <SelectPopover>
      <ListBox selection-mode="multiple">
        <ListBoxItem
          v-for="country in travelCountries"
          :key="country.id"
          :text-value="country.name"
          :value="country.id"
        >
          {{ country.name }}
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
import { travelCountries } from './select-data'
</script>
