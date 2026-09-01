<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, ref } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalTriggerProps {
  as?: string
  class?: string
  disabled?: boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<ModalTriggerProps>(), {
  as: 'div',
  disabled: undefined,
  isDisabled: undefined,
})

const context = inject(MODAL_CONTEXT_KEY, null)
const triggerRef = ref<HTMLElement | { $el?: HTMLElement } | null>(null)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const triggerClass = computed(() => composeTwClasses(props.class, context?.slots.value.trigger()))
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const resolveElement = (): HTMLElement | null => {
  const target = triggerRef.value
  if (!target) return null
  return target instanceof HTMLElement ? target : (target.$el ?? null)
}

const handleOpen = () => {
  if (finalIsDisabled.value) return
  // Report ourselves so focus can return here on close, even though clicking a
  // div[tabindex] does not necessarily focus it.
  context?.setTriggerElement(resolveElement())
  context?.open()
}
</script>

<template>
  <component
    :is="as"
    ref="triggerRef"
    :aria-disabled="dataAttr(finalIsDisabled)"
    :class="triggerClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    data-slot="modal-trigger"
    role="button"
    tabindex="0"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="handleOpen"
    @keydown.enter.prevent="handleOpen"
    @keydown.space.prevent="handleOpen"
  >
    <slot />
  </component>
</template>
