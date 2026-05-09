<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureIndicatorProps {
  class?: string
}

const props = defineProps<DisclosureIndicatorProps>()
const disclosureContext = inject(DISCLOSURE_CONTEXT_KEY, null)
const indicatorClass = computed(() =>
  composeTwClasses(props.class, disclosureContext?.slots.value.indicator()),
)
</script>

<template>
  <span
    :class="indicatorClass"
    :data-expanded="dataAttr(disclosureContext?.isExpanded.value)"
    aria-hidden="true"
    data-slot="disclosure-indicator"
  >
    <slot>
      <svg fill="none" viewBox="0 0 20 20">
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.8"
        />
      </svg>
    </slot>
  </span>
</template>
