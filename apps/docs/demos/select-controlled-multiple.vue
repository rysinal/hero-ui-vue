<template>
  <div class="space-y-4">
    <Select
      :value="selectedKeys"
      class="w-[256px]"
      placeholder="Select states"
      selection-mode="multiple"
      @change="handleChange"
    >
      <Label>States (controlled multiple)</Label>
      <SelectTrigger>
        <SelectValue>
          <template #default="{ defaultChildren, isPlaceholder }">
            {{ isPlaceholder ? defaultChildren : selectedLabels }}
          </template>
        </SelectValue>
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox selection-mode="multiple">
          <ListBoxItem
            v-for="state in extendedStates"
            :key="state.id"
            :text-value="state.name"
            :value="state.id"
          >
            {{ state.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </SelectPopover>
    </Select>
    <p class="text-sm text-muted">Selected: {{ selectedKeys.length ? selectedKeys.join(', ') : 'None' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
import { extendedStates } from './select-data'

type SelectChangeValue = string | number | (string | number)[] | null

const selectedKeys = ref<(string | number)[]>(['california', 'texas'])
const selectedLabels = computed(() =>
  selectedKeys.value
    .map((key) => extendedStates.find((state) => state.id === key)?.name ?? String(key))
    .join(', '),
)

const handleChange = (value: SelectChangeValue) => {
  selectedKeys.value = Array.isArray(value) ? value : value == null ? [] : [value]
}
</script>
