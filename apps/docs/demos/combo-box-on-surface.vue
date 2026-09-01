<template>
  <Surface class="w-full max-w-[320px] rounded-3xl p-6">
    <ComboBox class="w-full" full-width>
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." variant="secondary" />
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
  </Surface>
</template>

<script setup lang="ts">
import { ComboBox, Input, Label, ListBox, ListBoxItem, ListBoxItemIndicator, Surface } from '@rysinal/heroui-vue'
import { animals } from './combo-box-data'
</script>
