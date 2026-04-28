<script setup lang="ts">
import { computed } from 'vue'
import { inputVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface InputProps {
  class?: string
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  placeholder?: string
  modelValue?: string | number
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  variant: 'primary',
  type: 'text',
  fullWidth: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

const inputClass = computed(() => {
  const styles = inputVariants({
    variant: props.variant,
    fullWidth: props.fullWidth,
  })
  return composeTwClasses(props.class, styles)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
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
    :id="props.id"
    :class="inputClass"
    :type="props.type"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    data-slot="input"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>
