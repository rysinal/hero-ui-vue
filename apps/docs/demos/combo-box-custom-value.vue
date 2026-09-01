<template>
  <div class="flex w-[256px] flex-col gap-2">
    <ComboBox v-model="selected" v-model:input-value="query" allows-custom-value>
      <Label>Tag</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Pick or invent a tag" />
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
      {{ selected ? `Selected ${selected}` : `Custom value: ${query || 'none'}` }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComboBox, Input, Label, ListBox, ListBoxItem, ListBoxItemIndicator } from '@rysinal/heroui-vue'
import { animals } from './combo-box-data'

const selected = ref<string | number | null>(null)
const query = ref('')
</script>
