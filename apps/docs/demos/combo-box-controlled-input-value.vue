<template>
  <div class="flex w-[256px] flex-col gap-2">
    <ComboBox v-model:input-value="query">
      <Label>Favorite Animal</Label>
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
    <p class="text-sm text-muted">Query: {{ query || 'empty' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComboBox, Input, Label, ListBox, ListBoxItem, ListBoxItemIndicator } from '@rysinal/heroui-vue'
import { animals } from './combo-box-data'

const query = ref('')
</script>
