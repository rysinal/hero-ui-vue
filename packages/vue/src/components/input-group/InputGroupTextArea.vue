<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { INPUT_GROUP_CONTEXT_KEY } from './context'

interface InputGroupTextAreaProps {
  class?: string
  disabled?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  modelValue?: string
  name?: string
  placeholder?: string
  required?: boolean
  rows?: number
}

const props = withDefaults(defineProps<InputGroupTextAreaProps>(), {
  disabled: undefined,
  isDisabled: undefined,
  isInvalid: undefined,
  required: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
}>()

const context = inject(INPUT_GROUP_CONTEXT_KEY, null)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const textareaClass = computed(() => composeTwClasses(props.class, context?.slots.value.input()))

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)
}
</script>

<template>
  <textarea
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-invalid="dataAttr(props.isInvalid)"
    :class="textareaClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-invalid="dataAttr(props.isInvalid)"
    :disabled="finalIsDisabled"
    :name="props.name"
    :placeholder="props.placeholder"
    :required="props.required"
    :rows="props.rows"
    :value="props.modelValue"
    data-slot="input-group-textarea"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @input="handleInput"
  />
</template>
