<script setup lang="ts">
import { TooltipArrow as RadixTooltipArrow } from 'radix-vue'

interface TooltipArrowProps {
  class?: string
}

const props = defineProps<TooltipArrowProps>()
</script>

<template>
  <RadixTooltipArrow :class="props.class" as-child>
    <slot>
      <svg
        data-slot="overlay-arrow"
        fill="none"
        height="12"
        viewBox="0 0 12 12"
        width="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0C5.48483 8 6.5 8 12 0Z" />
      </svg>
    </slot>
  </RadixTooltipArrow>
</template>
