<script setup lang="ts">
/* global Event, FocusEvent, HTMLInputElement */
import { computed, inject, ref, watch } from 'vue'
import { inputVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { TEXT_FIELD_CONTEXT_KEY } from '../textfield/context'

interface InputProps {
  class?: string
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  type?: string
  placeholder?: string
  modelValue?: string | number
  disabled?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  required?: boolean
  isRequired?: boolean
  name?: string
  id?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: undefined,
  fullWidth: false,
  isDisabled: undefined,
  isInvalid: undefined,
  isRequired: undefined,
  required: undefined,
  variant: 'primary',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

// A TextField ancestor owns type/value/state when this Input is composed
// inside one; explicit props still win.
const field = inject(TEXT_FIELD_CONTEXT_KEY, null)

const finalType = computed(() => props.type ?? field?.type.value ?? 'text')
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

const controlledValue = computed(() => props.modelValue ?? field?.value.value)
const isControlled = computed(() => controlledValue.value !== undefined)
const internalValue = ref<string | number>(controlledValue.value ?? '')
const inputValue = computed(() => controlledValue.value ?? internalValue.value)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

watch(controlledValue, (value) => {
  if (isControlled.value) internalValue.value = value ?? ''
})

const inputClass = computed(() => {
  const styles = inputVariants({
    variant: finalVariant.value,
    fullWidth: props.fullWidth,
  })
  return composeTwClasses(props.class, styles)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = finalType.value === 'number' ? Number(target.value) : target.value

  if (!isControlled.value) internalValue.value = value
  emit('update:modelValue', value)
  field?.setValue(value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

<template>
  <input
    :id="finalId"
    :class="inputClass"
    :type="finalType"
    :placeholder="props.placeholder"
    :value="inputValue"
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-invalid="dataAttr(finalIsInvalid)"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-invalid="dataAttr(finalIsInvalid)"
    :data-required="dataAttr(finalIsRequired)"
    :disabled="finalIsDisabled"
    :required="finalIsRequired"
    :name="finalName"
    data-slot="input"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>
