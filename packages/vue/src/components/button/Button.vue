<script setup lang="ts">
import { computed, inject, type ButtonHTMLAttributes } from 'vue'
import { buttonVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'
import { BUTTON_GROUP_CONTEXT_KEY, type ButtonGroupContext } from '../button-group/context'

interface ButtonProps {
  as?: string
  disabled?: boolean
  type?: ButtonHTMLAttributes['type']
  class?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-soft' | 'outline' | 'ghost'
  fullWidth?: boolean
  isIconOnly?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button',
})

const buttonGroupContext = inject<ButtonGroupContext | null>(
  BUTTON_GROUP_CONTEXT_KEY,
  null,
)

const finalSize = computed(() => props.size ?? buttonGroupContext?.size)
const finalVariant = computed(() => props.variant ?? buttonGroupContext?.variant)
const finalIsDisabled = computed(
  () => props.disabled ?? buttonGroupContext?.isDisabled,
)
const finalFullWidth = computed(
  () => props.fullWidth ?? buttonGroupContext?.fullWidth,
)

const buttonClass = computed(() => {
  const styles = buttonVariants({
    fullWidth: finalFullWidth.value,
    isIconOnly: props.isIconOnly,
    size: finalSize.value,
    variant: finalVariant.value,
  })

  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <component
    :is="props.as"
    :class="buttonClass"
    :disabled="finalIsDisabled"
    :type="props.type"
    data-slot="button"
  >
    <slot />
  </component>
</template>
