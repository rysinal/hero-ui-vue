<template>
  <Select class="w-[256px]" placeholder="Select a Pokemon">
    <Label>Pick a Pokemon</Label>
    <SelectTrigger>
      <SelectValue />
      <SelectIndicator />
    </SelectTrigger>
    <SelectPopover>
      <ListBox>
        <ListBoxItem
          v-for="pokemon in items"
          :key="pokemon"
          :text-value="pokemon"
          :value="pokemon"
        >
          {{ pokemon }}
          <ListBoxItemIndicator />
        </ListBoxItem>
        <div v-if="hasMore" class="select-load-more" role="presentation">
          <button class="select-load-more__button" type="button" @click.stop="loadMore">
            <Spinner v-if="isLoading" size="sm" />
            <span class="text-sm text-muted">{{ isLoading ? 'Loading more...' : 'Load more' }}</span>
          </button>
        </div>
      </ListBox>
    </SelectPopover>
  </Select>
</template>

<script setup lang="ts">
/* global window */
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
  Spinner,
} from '@rysinal/heroui-vue'
import { pokemonNames } from './select-data'

const pageSize = 6
const items = ref(pokemonNames.slice(0, pageSize))
const isLoading = ref(false)
const hasMore = computed(() => items.value.length < pokemonNames.length)

const loadMore = () => {
  if (isLoading.value || !hasMore.value) return

  isLoading.value = true
  window.setTimeout(() => {
    const nextLength = items.value.length + pageSize
    items.value = pokemonNames.slice(0, nextLength)
    isLoading.value = false
  }, 500)
}
</script>

<style scoped>
.select-load-more {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}

.select-load-more__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2rem;
  color: var(--color-muted);
  cursor: var(--cursor-interactive);
}
</style>
