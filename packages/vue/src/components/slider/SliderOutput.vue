<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { SLIDER_CONTEXT_KEY } from './context'

interface SliderOutputProps {
  class?: string
}

const props = defineProps<SliderOutputProps>()
const context = inject(SLIDER_CONTEXT_KEY, null)

const outputClass = computed(() => composeTwClasses(props.class, context?.slots.value.output()))
const state = computed(() => context?.state.value)
// React joins every thumb label with an en dash.
const defaultLabel = computed(() => state.value?.labels.join(' – ') ?? '')
</script>

<template>
  <output :class="outputClass" data-slot="slider-output">
    <slot v-bind="state ?? {}">{{ defaultLabel }}</slot>
  </output>
</template>
