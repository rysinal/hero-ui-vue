<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY } from './context'

interface SelectIndicatorProps {
  class?: string
}

const props = defineProps<SelectIndicatorProps>()
const vueSlots = useSlots()
const context = inject(SELECT_CONTEXT_KEY, null)
const indicatorClass = computed(() => composeTwClasses(props.class, context?.slots.value.indicator()))
const hasCustomIndicator = computed(() => Boolean(vueSlots.default))
</script>

<template>
  <span
    :class="indicatorClass"
    :data-open="dataAttr(context?.isOpen.value)"
    :data-slot="hasCustomIndicator ? 'select-indicator' : 'select-default-indicator'"
  >
    <slot :is-open="context?.isOpen.value" :is-disabled="context?.isDisabled.value">
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
