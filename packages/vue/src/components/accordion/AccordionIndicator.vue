<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { ACCORDION_CONTEXT_KEY, ACCORDION_ITEM_CONTEXT_KEY } from './context'

interface AccordionIndicatorProps {
  class?: string
}

const props = defineProps<AccordionIndicatorProps>()
const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const itemContext = inject(ACCORDION_ITEM_CONTEXT_KEY, null)
const indicatorClass = computed(() => composeTwClasses(props.class, accordionContext?.slots.indicator()))
const isExpanded = computed(() => itemContext?.expanded.value ?? false)
</script>

<template>
  <span :class="indicatorClass" :data-expanded="dataAttr(isExpanded)" data-slot="accordion-indicator">
    <slot :is-expanded="isExpanded">
      <svg
        aria-hidden="true"
        fill="none"
        height="1em"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="1em"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </slot>
  </span>
</template>
