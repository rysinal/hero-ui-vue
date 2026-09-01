<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PROGRESS_CIRCLE_CONTEXT_KEY } from './context'

interface ProgressCircleFillCircleProps {
  class?: string
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
    :cx="geometry?.center"
    :cy="geometry?.center"
    :r="geometry?.radius"
    :stroke-dasharray="geometry?.circumference"
    :stroke-dashoffset="geometry?.dashOffset"
    :stroke-width="geometry?.strokeWidth"
    :transform="`rotate(-90 ${geometry?.center} ${geometry?.center})`"
    data-slot="progress-circle-fill-circle"
    fill="none"
    stroke-linecap="round"
  />
</template>
