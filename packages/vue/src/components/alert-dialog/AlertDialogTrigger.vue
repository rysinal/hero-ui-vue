<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogTriggerProps {
  as?: string
  class?: string
  disabled?: boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<AlertDialogTriggerProps>(), {
  as: 'div',
  disabled: undefined,
  isDisabled: undefined,
})

const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const triggerClass = computed(() => composeTwClasses(props.class, context?.slots.value.trigger()))
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const handleClick = () => {
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
    data-slot="alert-dialog-trigger"
    role="button"
    tabindex="0"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot />
  </component>
</template>
