<template>
  <Autocomplete class="w-[256px]" placeholder="Search...">
    <Label>Search a Star Wars character</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value />
      <Autocomplete.ClearButton />
      <Autocomplete.Indicator />
    </Autocomplete.Trigger>
    <Autocomplete.Popover>
      <!-- No filter predicate: the server already narrowed the list. -->
      <Autocomplete.Filter @input-change="search">
        <SearchField class="sticky top-0 z-10" variant="secondary">
          <SearchFieldGroup>
            <SearchFieldSearchIcon />
            <SearchFieldInput autofocus placeholder="Search characters..." />
            <Spinner
              :class="isLoading ? '' : 'pointer-events-none opacity-0'"
              class="absolute top-1/2 right-2 -translate-y-1/2"
              size="sm"
            />
            <SearchFieldClearButton :class="isLoading ? 'pointer-events-none opacity-0' : ''" />
          </SearchFieldGroup>
        </SearchField>
        <ListBox class="max-h-[420px] overflow-y-auto">
          <ListBoxItem
            v-for="character in characters"
            :key="character.name"
            :text-value="character.name"
            :value="character.name"
          >
            {{ character.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
          <EmptyState v-if="!isLoading && characters.length === 0">No results found</EmptyState>
        </ListBox>
      </Autocomplete.Filter>
    </Autocomplete.Popover>
  </Autocomplete>
</template>

<script setup lang="ts">
/* global AbortController, fetch, setTimeout, clearTimeout */
import { onBeforeUnmount, ref } from 'vue'
import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  SearchField,
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
  Spinner,
} from '@rysinal/heroui-vue'

interface Character {
  name: string
}

const characters = ref<Character[]>([])
const isLoading = ref(false)

let controller: AbortController | null = null
let debounceHandle: ReturnType<typeof setTimeout> | null = null

const load = async (query: string) => {
  controller?.abort()
  controller = new AbortController()
  isLoading.value = true

  try {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(query)}`,
      { signal: controller.signal },
    )
    const json = (await response.json()) as { results?: Character[] }

    characters.value = json.results ?? []
  } catch (error) {
    // An aborted request was superseded by a newer keystroke, so it is expected.
    if ((error as Error).name !== 'AbortError') {
      characters.value = []
    }
  } finally {
    isLoading.value = false
  }
}

const search = (query: string) => {
  if (debounceHandle) clearTimeout(debounceHandle)
  debounceHandle = setTimeout(() => void load(query), 300)
}

onBeforeUnmount(() => {
  if (debounceHandle) clearTimeout(debounceHandle)
  controller?.abort()
})
</script>
