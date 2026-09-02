<script setup lang="ts">
/* global MouseEvent */
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { SELECT_CONTEXT_KEY } from '../select/context'
import { AUTOCOMPLETE_CONTEXT_KEY } from './context'

interface AutocompleteClearButtonProps {
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<AutocompleteClearButtonProps>(), {
  ariaLabel: 'Clear selection',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const selectContext = inject(SELECT_CONTEXT_KEY, null)
const autocompleteContext = inject(AUTOCOMPLETE_CONTEXT_KEY, null)
const isEmpty = computed(() => !selectContext?.hasSelection.value)
const clearButtonClass = computed(() =>
  composeTwClasses(props.class, autocompleteContext?.slots.value.clearButton()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(
  () => selectContext?.isDisabled.value,
)

const handleClick = (event: MouseEvent) => {
  // The trigger would otherwise toggle the popover open again.
  event.stopPropagation()
  autocompleteContext?.clear()
  emit('click', event)
}
</script>

<template>
  <button
    :aria-label="props.ariaLabel"
    :class="clearButtonClass"
    :data-empty="dataAttr(isEmpty)"
    :disabled="selectContext?.isDisabled.value"
    data-slot="autocomplete-clear-button"
    type="button"
    v-bind="interactionAttrs"
    @click="handleClick"
    v-on="interactionHandlers"
  >
    <slot>
      <svg aria-hidden="true" data-slot="autocomplete-clear-button-icon" fill="none" viewBox="0 0 16 16">
        <path
          d="m4.5 4.5 7 7M11.5 4.5l-7 7"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1.8"
        />
      </svg>
    </slot>
  </button>
</template>
