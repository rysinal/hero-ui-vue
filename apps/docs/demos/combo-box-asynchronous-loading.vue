<template>
  <ComboBox v-model:input-value="query" class="w-[256px]">
    <Label>Search animals</Label>
    <ComboBox.InputGroup>
      <Input placeholder="Type to search..." />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <ComboBox.Popover>
      <ListBox>
        <div v-if="isLoading" class="flex items-center gap-2 px-3 py-2 text-sm text-muted">
          <Spinner class="size-4" />
          Loading...
        </div>
        <template v-else>
          <ListBoxItem v-for="animal in results" :key="animal.id" :text-value="animal.name" :value="animal.id">
            {{ animal.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
        </template>
      </ListBox>
    </ComboBox.Popover>
  </ComboBox>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ComboBox, Input, Label, ListBox, ListBoxItem, ListBoxItemIndicator, Spinner } from '@rysinal/heroui-vue'
import { animals } from './combo-box-data'

const query = ref('')
const isLoading = ref(false)
const results = ref(animals)

watch(query, () => {
  isLoading.value = true
  setTimeout(() => {
    results.value = animals
    isLoading.value = false
  }, 400)
})
</script>
