<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { INPUT_GROUP_CONTEXT_KEY } from './context'

interface InputGroupInputProps {
  class?: string
  disabled?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  modelValue?: string | number
  name?: string
  placeholder?: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
}

const props = withDefaults(defineProps<InputGroupInputProps>(), {
  disabled: undefined,
  isDisabled: undefined,
  isInvalid: undefined,
  required: undefined,
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [event: Event]
}>()

const context = inject(INPUT_GROUP_CONTEXT_KEY, null)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const inputClass = computed(() => composeTwClasses(props.class, context?.slots.value.input()))

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input', event)
}
</script>

<template>
  <input
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-invalid="dataAttr(props.isInvalid)"
    :class="inputClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-invalid="dataAttr(props.isInvalid)"
    :disabled="finalIsDisabled"
    :name="props.name"
    :placeholder="props.placeholder"
    :required="props.required"
    :type="props.type"
    :value="props.modelValue"
    data-slot="input-group-input"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @input="handleInput"
  />
</template>
