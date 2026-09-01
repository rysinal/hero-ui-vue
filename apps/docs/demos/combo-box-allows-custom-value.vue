<template>
  <div class="flex w-[256px] flex-col gap-2">
    <ComboBox v-model:input-value="query" allows-custom-value>
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Type anything..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <Description>Values outside the list are kept</Description>
      <ComboBox.Popover>
        <ListBox>
          <ListBoxItem v-for="animal in animals" :key="animal.id" :text-value="animal.name" :value="animal.id">
            {{ animal.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
    <p class="text-sm text-muted">Current text: {{ query || 'empty' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComboBox, Description, Input, Label, ListBox, ListBoxItem, ListBoxItemIndicator } from '@rysinal/heroui-vue'
import { animals } from './combo-box-data'

const query = ref('')
</script>
