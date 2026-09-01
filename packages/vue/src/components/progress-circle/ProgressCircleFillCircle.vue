<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PROGRESS_CIRCLE_CONTEXT_KEY } from './context'

interface ProgressCircleFillCircleProps {
  class?: string
  /** Geometry overrides; default to the shared values from the root. */
  cx?: number
  cy?: number
  r?: number
  strokeWidth?: number
}

const props = defineProps<ProgressCircleFillCircleProps>()
const context = inject(PROGRESS_CIRCLE_CONTEXT_KEY, null)
const circleClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.fillCircle()),
)
const geometry = computed(() => context?.geometry.value)
</script>

<template>
  <circle
    :class="circleClass"
    :cx="props.cx ?? geometry?.center"
    :cy="props.cy ?? geometry?.center"
    :r="props.r ?? geometry?.radius"
    :stroke-dasharray="geometry?.circumference"
    :stroke-dashoffset="geometry?.dashOffset"
    :stroke-width="props.strokeWidth ?? geometry?.strokeWidth"
    :transform="`rotate(-90 ${props.cx ?? geometry?.center} ${props.cy ?? geometry?.center}`+`)`"
    data-slot="progress-circle-fill-circle"
    fill="none"
    stroke-linecap="round"
  />
</template>
