<template>
  <div class="space-y-2">
    <Select
      :value="selectedStateKey"
      class="w-[256px]"
      placeholder="Select a state"
      @change="handleChange"
    >
      <Label>State (controlled)</Label>
      <SelectTrigger>
        <SelectValue>
          <template #default="{ defaultChildren, isPlaceholder }">
            {{ isPlaceholder ? defaultChildren : selectedState?.name ?? defaultChildren }}
          </template>
        </SelectValue>
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox>
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
    <p class="text-sm text-muted">Selected: {{ selectedState?.name || 'None' }}</p>
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

const selectedStateKey = ref<string | null>('california')
const selectedState = computed(() =>
  extendedStates.find((state) => state.id === selectedStateKey.value),
)

const handleChange = (value: SelectChangeValue) => {
  if (Array.isArray(value)) return
  selectedStateKey.value = value == null ? null : String(value)
}
</script>
