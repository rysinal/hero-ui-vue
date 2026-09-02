<script setup lang="ts">
/* global HTMLElement, MouseEvent, Node */
import { computed, inject, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import { PopoverTrigger } from 'radix-vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { SELECT_CONTEXT_KEY } from '../select/context'
import { AUTOCOMPLETE_CONTEXT_KEY } from './context'

defineOptions({
  inheritAttrs: false,
})

interface AutocompleteTriggerProps {
  class?: string
  disabled?: boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<AutocompleteTriggerProps>(), {
  disabled: undefined,
  isDisabled: undefined,
})

const selectContext = inject(SELECT_CONTEXT_KEY, null)
const autocompleteContext = inject(AUTOCOMPLETE_CONTEXT_KEY, null)
const attrs = useAttrs()
const triggerRef = ref<HTMLElement | null>(null)
const finalIsDisabled = computed(
  () => props.disabled ?? props.isDisabled ?? selectContext?.isDisabled.value,
)
const triggerClass = computed(() =>
  composeTwClasses(props.class, autocompleteContext?.slots.value.trigger()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)
const triggerAttrs = computed(() => ({
  ...attrs,
  ...interactionAttrs.value,
}))

/**
 * React renders the trigger as a Group and toggles on click, skipping clicks
 * that landed on the clear button. Radix's PopoverTrigger toggles for us, so we
 * only have to stop that bubbling when the clear button was the target.
 */
const handleClick = (event: MouseEvent) => {
  const target = event.target as Node | null
  if (!target) return

  const clearButton = triggerRef.value?.querySelector('[data-slot="autocomplete-clear-button"]')
  if (clearButton?.contains(target)) {
    event.stopPropagation()
  }
}

onMounted(() => {
  selectContext?.setTriggerElement(triggerRef.value)
})

onBeforeUnmount(() => {
  selectContext?.setTriggerElement(null)
})
</script>

<template>
  <PopoverTrigger as-child>
    <div
      ref="triggerRef"
      v-bind="triggerAttrs"
      :aria-disabled="dataAttr(finalIsDisabled)"
      :aria-expanded="dataAttr(selectContext?.isOpen.value)"
      :class="triggerClass"
      :data-disabled="dataAttr(finalIsDisabled)"
      :data-open="dataAttr(selectContext?.isOpen.value)"
      :tabindex="finalIsDisabled ? -1 : 0"
      data-slot="autocomplete-trigger"
      role="button"
      @click="handleClick"
      v-on="interactionHandlers"
    >
      <slot :is-disabled="finalIsDisabled" :is-open="selectContext?.isOpen.value" />
    </div>
  </PopoverTrigger>
</template>
