<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { ACCORDION_CONTEXT_KEY, ACCORDION_ITEM_CONTEXT_KEY } from './context'

interface AccordionTriggerProps {
  class?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<AccordionTriggerProps>(), {
  type: 'button',
})

const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const itemContext = inject(ACCORDION_ITEM_CONTEXT_KEY, null)
const triggerClass = computed(() => composeTwClasses(props.class, accordionContext?.slots.trigger()))
const isDisabled = computed(() => itemContext?.disabled.value ?? accordionContext?.disabled.value)
const isExpanded = computed(() => itemContext?.expanded.value ?? false)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => isDisabled.value)

const handleClick = () => {
  if (!itemContext || isDisabled.value) return
  accordionContext?.toggle(itemContext.value.value)
}
</script>

<template>
  <button
    :id="itemContext?.triggerId"
    :class="triggerClass"
    :aria-controls="itemContext?.panelId"
    :aria-disabled="dataAttr(isDisabled)"
    :aria-expanded="isExpanded"
    :data-disabled="dataAttr(isDisabled)"
    :data-expanded="dataAttr(isExpanded)"
    :disabled="isDisabled"
    :type="type"
    data-slot="accordion-trigger"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="handleClick"
  >
    <slot :is-expanded="isExpanded" :is-disabled="isDisabled" />
  </button>
</template>
