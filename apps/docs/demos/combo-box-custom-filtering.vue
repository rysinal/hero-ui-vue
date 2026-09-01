<template>
  <ComboBox class="w-[256px]" :filter="startsWith">
    <Label>Favorite Animal</Label>
    <ComboBox.InputGroup>
      <Input placeholder="Type the first letters..." />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <Description>This one matches from the start rather than anywhere</Description>
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

const startsWith = (textValue: string, query: string) =>
  textValue.toLowerCase().startsWith(query.toLowerCase())
</script>
