<template>
  <div class="space-y-4">
    <Select
      :is-open="isOpen"
      class="w-[256px]"
      placeholder="Select one"
      @open-change="isOpen = $event"
    >
      <Label>State</Label>
      <SelectTrigger>
        <SelectValue />
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox>
          <ListBoxItem
            v-for="state in states"
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
    <Button @click="isOpen = !isOpen">{{ isOpen ? 'Close' : 'Open' }} Select</Button>
    <p class="text-sm text-muted">Select is {{ isOpen ? 'open' : 'closed' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
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
import { states } from './select-data'

const isOpen = ref(false)
</script>
