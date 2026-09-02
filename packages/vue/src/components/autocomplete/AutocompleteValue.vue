<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY } from '../select/context'
import { AUTOCOMPLETE_CONTEXT_KEY } from './context'

interface AutocompleteValueProps {
  class?: string
  placeholder?: string
}

const props = defineProps<AutocompleteValueProps>()
const selectContext = inject(SELECT_CONTEXT_KEY, null)
const autocompleteContext = inject(AUTOCOMPLETE_CONTEXT_KEY, null)
const isPlaceholder = computed(() => !selectContext?.hasSelection.value)
const defaultChildren = computed(() => {
  if (!selectContext?.hasSelection.value) {
    return props.placeholder ?? selectContext?.placeholder.value
  }

  return selectContext.selectedItems.value.map((item) => item.textValue).join(', ')
})
const valueClass = computed(() =>
  composeTwClasses(props.class, autocompleteContext?.slots.value.value()),
)
const state = computed(() => ({
  selectedItems: selectContext?.selectedItems.value ?? [],
  selectedKeys: selectContext?.selectedKeys.value ?? [],
  selectionMode: selectContext?.selectionMode.value,
}))
</script>

<template>
  <span
    :class="valueClass"
    :data-placeholder="dataAttr(isPlaceholder)"
    data-slot="autocomplete-value"
  >
    <slot :default-children="defaultChildren" :is-placeholder="isPlaceholder" :state="state">
      {{ defaultChildren }}
    </slot>
  </span>
</template>
