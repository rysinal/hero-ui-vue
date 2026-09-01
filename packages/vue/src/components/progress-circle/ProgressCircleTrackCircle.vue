<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PROGRESS_CIRCLE_CONTEXT_KEY } from './context'

interface ProgressCircleTrackCircleProps {
  class?: string
  /** Geometry overrides; default to the shared values from the root. */
  cx?: number
  cy?: number
  r?: number
  strokeWidth?: number
}

const props = defineProps<ProgressCircleTrackCircleProps>()
const context = inject(PROGRESS_CIRCLE_CONTEXT_KEY, null)
const circleClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.trackCircle()),
)
const geometry = computed(() => context?.geometry.value)
</script>

<template>
  <circle
    :class="circleClass"
    :cx="props.cx ?? geometry?.center"
    :cy="props.cy ?? geometry?.center"
    :r="props.r ?? geometry?.radius"
    :stroke-width="props.strokeWidth ?? geometry?.strokeWidth"
    data-slot="progress-circle-track-circle"
    fill="none"
  />
</template>
