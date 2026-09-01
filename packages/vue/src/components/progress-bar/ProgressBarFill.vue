<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PROGRESS_BAR_CONTEXT_KEY } from './context'

interface ProgressBarFillProps {
  class?: string
}

const props = defineProps<ProgressBarFillProps>()
const context = inject(PROGRESS_BAR_CONTEXT_KEY, null)
const fillClass = computed(() => composeTwClasses(props.class, context?.slots.value.fill()))
const fillStyle = computed(() =>
  context?.percentage.value === undefined ? undefined : { width: `${context.percentage.value}%` },
)
</script>

<template>
  <div :class="fillClass" :style="fillStyle" data-slot="progress-bar-fill">
    <slot />
  </div>
</template>
