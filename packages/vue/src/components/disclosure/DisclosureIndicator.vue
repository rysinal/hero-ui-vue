<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureIndicatorProps {
  class?: string
}

const props = defineProps<DisclosureIndicatorProps>()
const slots = useSlots()
const disclosureContext = inject(DISCLOSURE_CONTEXT_KEY, null)
const indicatorClass = computed(() =>
  composeTwClasses(props.class, disclosureContext?.slots.value.indicator()),
)
const isExpanded = computed(() => disclosureContext?.isExpanded.value ?? false)
const hasCustomIndicator = computed(() => Boolean(slots.default))
</script>

<template>
  <span
    v-if="hasCustomIndicator"
    :class="indicatorClass"
    :data-expanded="dataAttr(isExpanded)"
    aria-hidden="true"
    data-slot="disclosure-indicator"
  >
    <slot />
  </span>
  <svg
    v-else
    :class="indicatorClass"
    :data-expanded="dataAttr(isExpanded)"
    aria-hidden="true"
    aria-label="Chevron down icon"
    data-slot="disclosure-indicator"
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
