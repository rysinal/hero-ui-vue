<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PROGRESS_CIRCLE_CONTEXT_KEY } from './context'

interface ProgressCircleTrackProps {
  class?: string
  /** Overrides the viewBox derived from the root geometry. */
  viewBox?: string
}

const props = defineProps<ProgressCircleTrackProps>()
const context = inject(PROGRESS_CIRCLE_CONTEXT_KEY, null)
const trackClass = computed(() => composeTwClasses(props.class, context?.slots.value.track()))
const viewBox = computed(() => {
  if (props.viewBox) return props.viewBox
  const size = (context?.geometry.value.center ?? 18) * 2
  return `0 0 ${size} ${size}`
})
</script>

<template>
  <svg :class="trackClass" :viewBox="viewBox" data-slot="progress-circle-track" fill="none">
    <slot />
  </svg>
</template>
