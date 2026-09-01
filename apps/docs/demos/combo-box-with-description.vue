<template>
  <ComboBox class="w-[256px]">
    <Label>Favorite Animal</Label>
    <ComboBox.InputGroup>
      <Input placeholder="Search animals..." />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <Description>Start typing to filter the list</Description>
    <ComboBox.Popover>
      <ListBox>
        <ListBoxItem v-for="animal in animals" :key="animal.id" :text-value="animal.name" :value="animal.id">
          {{ animal.name }}
          <ListBoxItemIndicator />
        </ListBoxItem>
      </ListBox>
    </ComboBox.Popover>
  </ComboBox>
</template>

<script setup lang="ts">
import { ComboBox, Description, Input, Label, ListBox, ListBoxItem, ListBoxItemIndicator } from '@rysinal/heroui-vue'
import { animals } from './combo-box-data'
</script>
