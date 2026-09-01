<template>
  <div class="flex flex-col gap-4">
    <Select class="w-[256px]" default-value="california" is-disabled placeholder="Select one">
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
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
      </Select.Popover>
    </Select>
    <Select class="w-[256px]" :disabled-keys="['texas']" placeholder="Select one">
      <Label>State with a disabled option</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
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
      </Select.Popover>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { Label, ListBox, ListBoxItem, ListBoxItemIndicator, Select } from '@rysinal/heroui-vue'
import { states } from './select-data'
</script>
