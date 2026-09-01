<script setup lang="ts">
/* global KeyboardEvent, MouseEvent */
import { computed, inject } from 'vue'
import { PopoverTrigger } from 'radix-vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { POPOVER_CONTEXT_KEY } from './context'

interface PopoverTriggerProps {
  as?: string
  asChild?: boolean
  class?: string
  disabled?: boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'div',
  asChild: false,
  disabled: undefined,
  isDisabled: undefined,
})

const context = inject(POPOVER_CONTEXT_KEY, null)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const triggerClass = computed(() => composeTwClasses(props.class, context?.slots.value.trigger()))
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const preventDisabledActivation = (event: MouseEvent | KeyboardEvent) => {
  if (!finalIsDisabled.value) return

  event.preventDefault()
  event.stopPropagation()
}

const toggleFromKeyboard = (event: KeyboardEvent) => {
  if (props.asChild || finalIsDisabled.value) return

  event.preventDefault()
  context?.setOpen(!context.isOpen.value)
}
</script>

<template>
  <PopoverTrigger
    :aria-disabled="dataAttr(finalIsDisabled)"
    :as="as"
    :as-child="asChild"
    :class="triggerClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    :tabindex="asChild ? undefined : 0"
    data-slot="popover-trigger"
    role="button"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click.capture="preventDisabledActivation"
    @keydown.enter.capture="preventDisabledActivation"
    @keydown.enter="toggleFromKeyboard"
    @keydown.space.capture="preventDisabledActivation"
    @keydown.space="toggleFromKeyboard"
  >
    <slot />
  </PopoverTrigger>
</template>
