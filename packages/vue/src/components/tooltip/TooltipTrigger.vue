<script setup lang="ts">
import { computed, inject } from 'vue'
import { TooltipTrigger as RadixTooltipTrigger } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { TOOLTIP_CONTEXT_KEY } from './context'

interface TooltipTriggerProps {
  class?: string
  /** Renders the trigger as its child element rather than a button. */
  asChild?: boolean
}

const props = withDefaults(defineProps<TooltipTriggerProps>(), {
  asChild: true,
})

const context = inject(TOOLTIP_CONTEXT_KEY, null)
const triggerClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.trigger()),
)
</script>

<template>
  <RadixTooltipTrigger :as-child="props.asChild" :class="triggerClass" data-slot="tooltip-trigger">
    <slot />
  </RadixTooltipTrigger>
</template>
