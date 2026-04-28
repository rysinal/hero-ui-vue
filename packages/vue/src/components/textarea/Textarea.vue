<script setup lang="ts">
import { computed } from 'vue'
import { textAreaVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface TextareaProps {
  class?: string
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  cols?: number
  name?: string
  id?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  variant: 'primary',
  fullWidth: false,
})

const emit = defineEmits<{
  'update:value': [value: string]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const textareaClass = computed(() => {
  const styles = textAreaVariants({
    variant: props.variant,
    fullWidth: props.fullWidth,
  })
  return composeTwClasses(props.class, styles)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:value', target.value)
  emit('input', event)
}
</script>

<template>
  <textarea
    :class="textareaClass"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :rows="rows"
    :cols="cols"
    :name="name"
    :id="id"
    data-slot="textarea"
    @input="handleInput"
    @change="emit('change', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>
