<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { NUMBER_FIELD_CONTEXT_KEY } from './context'

interface NumberFieldInputProps {
  class?: string
  id?: string
  placeholder?: string
}

const props = defineProps<NumberFieldInputProps>()
const emit = defineEmits<{
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

const numberFieldContext = inject(NUMBER_FIELD_CONTEXT_KEY, null)
const inputClass = computed(() =>
  composeTwClasses(props.class, numberFieldContext?.slots.value.input()),
)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  numberFieldContext?.parseInput(target.value)
  emit('input', event)
}

const handleFocus = (event: FocusEvent) => {
  numberFieldContext?.setFocused(true)
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  numberFieldContext?.setFocused(false)
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    numberFieldContext?.increment()
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    numberFieldContext?.decrement()
  }
}
</script>

<template>
  <input
    :id="props.id ?? numberFieldContext?.id.value"
    :ref="(element) => { if (numberFieldContext) numberFieldContext.inputRef.value = element as HTMLInputElement | null }"
    :aria-disabled="dataAttr(numberFieldContext?.isDisabled.value)"
    :aria-invalid="dataAttr(numberFieldContext?.isInvalid.value)"
    :aria-valuemax="numberFieldContext?.maxValue.value"
    :aria-valuemin="numberFieldContext?.minValue.value"
    :aria-valuenow="numberFieldContext?.value.value"
    :class="inputClass"
    :data-disabled="dataAttr(numberFieldContext?.isDisabled.value)"
    :data-invalid="dataAttr(numberFieldContext?.isInvalid.value)"
    :data-required="dataAttr(numberFieldContext?.isRequired.value)"
    :disabled="numberFieldContext?.isDisabled.value"
    :max="numberFieldContext?.maxValue.value"
    :min="numberFieldContext?.minValue.value"
    :name="numberFieldContext?.name.value"
    :placeholder="props.placeholder"
    :required="numberFieldContext?.isRequired.value"
    :step="numberFieldContext?.step.value"
    :value="numberFieldContext?.inputText.value"
    autocomplete="off"
    data-slot="number-field-input"
    inputmode="decimal"
    role="spinbutton"
    type="text"
    @blur="handleBlur"
    @focus="handleFocus"
    @input="handleInput"
    @keydown="handleKeydown"
  />
</template>
