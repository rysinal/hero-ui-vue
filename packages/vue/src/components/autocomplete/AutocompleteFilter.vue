<script setup lang="ts">
/* global HTMLElement, HTMLInputElement */
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
import { composeTwClasses } from '../../utils'
import { AUTOCOMPLETE_CONTEXT_KEY, type AutocompleteFilterFn } from './context'

interface AutocompleteFilterProps {
  class?: string
  /**
   * Predicate deciding whether an item survives the current query. Pair it with
   * `useFilter().contains` for locale-aware matching. Leave it off when the
   * items are already filtered elsewhere, e.g. by a server.
   */
  filter?: AutocompleteFilterFn
  /** Controlled query text, for callers that own the search state. */
  inputValue?: string
}

const props = withDefaults(defineProps<AutocompleteFilterProps>(), {
  filter: undefined,
  inputValue: undefined,
})

const emit = defineEmits<{
  'input-change': [value: string]
  'update:inputValue': [value: string]
}>()

const context = inject(AUTOCOMPLETE_CONTEXT_KEY, null)
const filterRef = ref<HTMLElement | null>(null)
const filterClass = computed(() => composeTwClasses(props.class, context?.slots.value.filter()))

const findInput = () =>
  filterRef.value?.querySelector<HTMLInputElement>('[data-slot="search-field-input"]') ??
  filterRef.value?.querySelector<HTMLInputElement>('input')

/**
 * The search field lives in this subtree as a sibling-provided component, so its
 * value cannot be injected — it is read straight off the DOM instead. Doing the
 * read after the current tick also covers changes made by the clear button,
 * which updates the input without emitting a DOM `input` event.
 */
const syncFromInput = async () => {
  await nextTick()

  const nextValue = findInput()?.value ?? ''
  if (nextValue === context?.filterQuery.value) return

  context?.setFilterQuery(nextValue)
  emit('update:inputValue', nextValue)
  emit('input-change', nextValue)
}

watch(
  () => props.filter,
  (filter) => {
    context?.registerFilter(filter ?? null)
  },
  { immediate: true },
)

// A controlled query wins over whatever sits in the DOM.
watch(
  () => props.inputValue,
  (inputValue) => {
    if (inputValue === undefined) return
    context?.setFilterQuery(inputValue)
  },
  { immediate: true },
)

onMounted(() => {
  // Autofocused search fields can arrive with text already in them.
  if (props.inputValue === undefined) void syncFromInput()
})
</script>

<template>
  <div
    ref="filterRef"
    :class="filterClass"
    data-slot="autocomplete-filter"
    @click="syncFromInput"
    @input="syncFromInput"
    @keyup="syncFromInput"
  >
    <slot :input-value="context?.filterQuery.value ?? ''" />
  </div>
</template>
