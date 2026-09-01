<script setup lang="ts">
/* global Event, FocusEvent, HTMLTextAreaElement */
import { computed, inject } from 'vue'
import { textAreaVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { TEXT_FIELD_CONTEXT_KEY } from '../textfield/context'

interface TextareaProps {
  class?: string
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  /** Supports `v-model`. */
  modelValue?: string
  /** Legacy alias for `modelValue`. */
  value?: string
  placeholder?: string
  disabled?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  readonly?: boolean
  required?: boolean
  isRequired?: boolean
  rows?: number
  cols?: number
  name?: string
  id?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: undefined,
  fullWidth: false,
  isDisabled: undefined,
  isInvalid: undefined,
  isRequired: undefined,
  modelValue: undefined,
  readonly: undefined,
  required: undefined,
  value: undefined,
  variant: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:value': [value: string]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// A TextField ancestor owns value/state when this TextArea is composed inside
// one; explicit props still win.
const field = inject(TEXT_FIELD_CONTEXT_KEY, null)

const finalValue = computed(
  () => props.modelValue ?? props.value ?? (field?.value.value as string | undefined),
)
const finalName = computed(() => props.name ?? field?.name.value)
const finalId = computed(() => props.id ?? field?.inputId.value)
const finalIsDisabled = computed(
  () => props.disabled ?? props.isDisabled ?? field?.isDisabled.value,
)
const finalIsInvalid = computed(() => props.isInvalid ?? field?.isInvalid.value)
const finalIsRequired = computed(
  () => props.required ?? props.isRequired ?? field?.isRequired.value,
)
const finalVariant = computed(() => props.variant ?? field?.variant.value ?? 'primary')

const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const textareaClass = computed(() => {
  const styles = textAreaVariants({
    variant: finalVariant.value,
    fullWidth: props.fullWidth,
  })
  return composeTwClasses(props.class, styles)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement

  emit('update:modelValue', target.value)
  emit('update:value', target.value)
  field?.setValue(target.value)
  emit('input', event)
}
</script>

<template>
  <textarea
    :id="finalId"
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-invalid="dataAttr(finalIsInvalid)"
    :class="textareaClass"
    :cols="cols"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-invalid="dataAttr(finalIsInvalid)"
    :data-required="dataAttr(finalIsRequired)"
    :disabled="finalIsDisabled"
    :name="finalName"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="finalIsRequired"
    :rows="rows"
    :value="finalValue"
    data-slot="textarea"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @input="handleInput"
    @change="emit('change', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>
