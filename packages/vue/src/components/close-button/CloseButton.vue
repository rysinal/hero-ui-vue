<script setup lang="ts">
import { computed } from 'vue'
import { closeButtonVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface CloseButtonProps {
  class?: string
  variant?: 'default'
  disabled?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<CloseButtonProps>(), {
  ariaLabel: 'Close',
})

const closeButtonClass = computed(() => {
  const styles = closeButtonVariants({
    variant: props.variant,
  })
  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <button
    :aria-label="props.ariaLabel"
    :class="closeButtonClass"
    :disabled="props.disabled"
    data-slot="close-button"
    type="button"
  >
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="1em"
    >
      <line x1="18" x2="6" y1="6" y2="18"></line>
      <line x1="6" x2="18" y1="6" y2="18"></line>
    </svg>
  </button>
</template>
