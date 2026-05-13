<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { ACCORDION_CONTEXT_KEY, ACCORDION_ITEM_CONTEXT_KEY } from './context'

interface AccordionIndicatorProps {
  class?: string
}

const props = defineProps<AccordionIndicatorProps>()
const slots = useSlots()
const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const itemContext = inject(ACCORDION_ITEM_CONTEXT_KEY, null)
const indicatorClass = computed(() => composeTwClasses(props.class, accordionContext?.slots.indicator()))
const isExpanded = computed(() => itemContext?.expanded.value ?? false)
const hasCustomIndicator = computed(() => Boolean(slots.default))
</script>

<template>
  <span
    v-if="hasCustomIndicator"
    :class="indicatorClass"
    :data-expanded="dataAttr(isExpanded)"
    data-slot="accordion-indicator"
  >
    <slot :is-expanded="isExpanded" />
  </span>
  <svg
    v-else
    :class="indicatorClass"
    :data-expanded="dataAttr(isExpanded)"
    aria-hidden="true"
    aria-label="Chevron down icon"
    data-slot="accordion-indicator"
    fill="none"
    role="presentation"
    viewBox="0 0 16 16"
  >
    <path
      clip-rule="evenodd"
      d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
      fill="currentColor"
      fill-rule="evenodd"
    />
  </svg>
</template>
