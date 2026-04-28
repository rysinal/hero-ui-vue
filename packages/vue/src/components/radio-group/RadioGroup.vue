<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupRoot } from 'radix-vue'
import { radioGroupVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface RadioGroupProps {
  class?: string
  variant?: 'primary' | 'secondary'
  modelValue?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
  loop?: boolean
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  variant: 'primary',
  orientation: 'vertical',
  loop: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const radioGroupClass = computed(() => {
  const styles = radioGroupVariants({ variant: props.variant })
  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <RadioGroupRoot
    :class="radioGroupClass"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :required="required"
    :name="name"
    :orientation="orientation"
    :loop="loop"
    data-slot="base"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </RadioGroupRoot>
</template>
