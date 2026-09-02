<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY } from '../select/context'
import { AUTOCOMPLETE_CONTEXT_KEY } from './context'

interface AutocompleteIndicatorProps {
  class?: string
}

const props = defineProps<AutocompleteIndicatorProps>()
const vueSlots = useSlots()
const selectContext = inject(SELECT_CONTEXT_KEY, null)
const autocompleteContext = inject(AUTOCOMPLETE_CONTEXT_KEY, null)
const indicatorClass = computed(() =>
  composeTwClasses(props.class, autocompleteContext?.slots.value.indicator()),
)
// React swaps the data-slot when the caller supplies their own icon.
const hasCustomIndicator = computed(() => Boolean(vueSlots.default))
</script>

<template>
  <span
    :class="indicatorClass"
    :data-open="dataAttr(selectContext?.isOpen.value)"
    :data-slot="hasCustomIndicator ? 'autocomplete-indicator' : 'autocomplete-default-indicator'"
  >
    <slot :is-disabled="selectContext?.isDisabled.value" :is-open="selectContext?.isOpen.value">
      <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>
    </slot>
  </span>
</template>
