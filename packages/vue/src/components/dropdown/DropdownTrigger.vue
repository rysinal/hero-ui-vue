<script setup lang="ts">
import { computed, inject } from 'vue'
import { DropdownMenuTrigger } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { DROPDOWN_CONTEXT_KEY } from './context'

interface DropdownTriggerProps {
  class?: string
  /** Renders the trigger as its child rather than wrapping it in a button. */
  asChild?: boolean
}

const props = withDefaults(defineProps<DropdownTriggerProps>(), {
  asChild: true,
})

const context = inject(DROPDOWN_CONTEXT_KEY, null)
const triggerClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.trigger()),
)
</script>

<template>
  <DropdownMenuTrigger
    :as-child="props.asChild"
    :class="triggerClass"
    data-slot="dropdown-trigger"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
