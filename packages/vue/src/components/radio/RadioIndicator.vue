<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { RADIO_CONTEXT_KEY } from './context'

interface RadioIndicatorProps {
  class?: string
}

const props = defineProps<RadioIndicatorProps>()
const context = inject(RADIO_CONTEXT_KEY, null)
const indicatorClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.indicator()),
)
</script>

<template>
  <span :class="indicatorClass" aria-hidden="true" data-slot="radio-indicator">
    <slot v-bind="context?.state.value ?? {}" />
  </span>
</template>
