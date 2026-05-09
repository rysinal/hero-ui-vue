<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SEARCH_FIELD_CONTEXT_KEY } from './context'

interface SearchFieldInputProps {
  class?: string
  id?: string
  placeholder?: string
}

const props = defineProps<SearchFieldInputProps>()
const emit = defineEmits<{
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

const searchFieldContext = inject(SEARCH_FIELD_CONTEXT_KEY, null)
const inputClass = computed(() =>
  composeTwClasses(props.class, searchFieldContext?.slots.value.input()),
)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchFieldContext?.updateValue(target.value)
  emit('input', event)
}

const handleFocus = (event: FocusEvent) => {
  searchFieldContext?.setFocused(true)
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  searchFieldContext?.setFocused(false)
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    searchFieldContext?.submit()
  }
}
</script>

<template>
  <input
    :id="props.id"
    :ref="(element) => { if (searchFieldContext) searchFieldContext.inputRef.value = element as HTMLInputElement | null }"
    :aria-disabled="dataAttr(searchFieldContext?.isDisabled.value)"
    :aria-invalid="dataAttr(searchFieldContext?.isInvalid.value)"
    :class="inputClass"
    :data-disabled="dataAttr(searchFieldContext?.isDisabled.value)"
    :data-invalid="dataAttr(searchFieldContext?.isInvalid.value)"
    :data-required="dataAttr(searchFieldContext?.isRequired.value)"
    :disabled="searchFieldContext?.isDisabled.value"
    :name="searchFieldContext?.name.value"
    :placeholder="props.placeholder"
    :required="searchFieldContext?.isRequired.value"
    :value="searchFieldContext?.value.value"
    data-slot="search-field-input"
    type="search"
    @blur="handleBlur"
    @focus="handleFocus"
    @input="handleInput"
    @keydown="handleKeydown"
  />
</template>
