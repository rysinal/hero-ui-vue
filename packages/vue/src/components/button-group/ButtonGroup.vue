<script setup lang="ts">
import { provide } from 'vue'
import { BUTTON_GROUP_CONTEXT_KEY, type ButtonGroupContext } from './context'

interface ButtonGroupProps extends ButtonGroupContext {
  class?: string
}

const props = defineProps<ButtonGroupProps>()

provide(BUTTON_GROUP_CONTEXT_KEY, {
  size: props.size,
  variant: props.variant,
  isDisabled: props.isDisabled,
  fullWidth: props.fullWidth,
})
</script>

<template>
  <div :class="props.class" data-slot="button-group" role="group">
    <slot />
  </div>
</template>
