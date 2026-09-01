<template>
  <div class="flex flex-col gap-4">
    <ComboBox class="w-[256px]">
      <Label>Opens on focus or typing</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBoxItem v-for="animal in animals" :key="animal.id" :text-value="animal.name" :value="animal.id">
            {{ animal.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
    <p class="text-sm text-muted">
      Typing opens the list; the trigger button toggles it, and ArrowDown opens it from the input.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ComboBox, Input, Label, ListBox, ListBoxItem, ListBoxItemIndicator } from '@rysinal/heroui-vue'
import { animals } from './combo-box-data'
</script>
