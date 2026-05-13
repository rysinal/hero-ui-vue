<script setup lang="ts">
import { computed, inject } from 'vue'
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
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const triggerClass = computed(() => composeTwClasses(props.class, context?.slots.value.trigger()))
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const handleOpen = () => {
  if (finalIsDisabled.value) return
  context?.open()
}
</script>

<template>
  <component
    :is="as"
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
