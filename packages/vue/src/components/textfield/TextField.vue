<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { textFieldVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'
import Label from '../label/Label.vue'
import Description from '../description/Description.vue'
import FieldError from '../field-error/FieldError.vue'
import Input from '../input/Input.vue'

interface TextFieldProps {
  class?: string
  fullWidth?: boolean
  label?: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
  // Input props
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  placeholder?: string
  modelValue?: string | number
  name?: string
  id?: string
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
  fullWidth: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const slots = useSlots()

const textFieldClass = computed(() => {
  const styles = textFieldVariants({ fullWidth: props.fullWidth })
  return composeTwClasses(props.class, styles)
})

const inputId = computed(() => props.id || `textfield-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (value: string | number) => {
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

<template>
  <div :class="textFieldClass" data-slot="textfield">
    <Label v-if="props.label || slots.label" :for="inputId" :required="props.required">
      <slot name="label">{{ props.label }}</slot>
    </Label>

    <Input
      :id="inputId"
      :type="props.type"
      :placeholder="props.placeholder"
      :model-value="props.modelValue"
      :name="props.name"
      :disabled="props.disabled"
      :required="props.required"
      :full-width="props.fullWidth"
      @update:model-value="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <Description v-if="props.description || slots.description">
      <slot name="description">{{ props.description }}</slot>
    </Description>

    <FieldError v-if="props.error || slots.error">
      <slot name="error">{{ props.error }}</slot>
    </FieldError>
  </div>
</template>
