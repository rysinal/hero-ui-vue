<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerTriggerProps {
  as?: string
  class?: string
  disabled?: boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<DrawerTriggerProps>(), {
  as: 'div',
  disabled: undefined,
  isDisabled: undefined,
})

const context = inject(DRAWER_CONTEXT_KEY, null)
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
    data-slot="drawer-trigger"
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
