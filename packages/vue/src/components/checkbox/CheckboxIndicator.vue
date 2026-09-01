<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CHECKBOX_CONTEXT_KEY } from './context'

interface CheckboxIndicatorProps {
  class?: string
}

const props = defineProps<CheckboxIndicatorProps>()
const context = inject(CHECKBOX_CONTEXT_KEY, null)

const state = computed(() => context?.state.value)
const indicatorClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.indicator()),
)
</script>

<template>
  <span :class="indicatorClass" aria-hidden="true" data-slot="checkbox-indicator">
    <slot v-bind="state ?? {}">
      <svg
        v-if="state?.isIndeterminate"
        aria-hidden="true"
        data-slot="checkbox-default-indicator--indeterminate"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="3"
        viewBox="0 0 24 24"
      >
        <line x1="21" x2="3" y1="12" y2="12" />
      </svg>
      <svg
        v-else
        :stroke-dashoffset="state?.isSelected ? 44 : 66"
        aria-hidden="true"
        data-slot="checkbox-default-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-dasharray="22"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    </slot>
  </span>
</template>
