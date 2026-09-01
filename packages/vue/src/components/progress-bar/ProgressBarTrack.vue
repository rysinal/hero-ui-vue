<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PROGRESS_BAR_CONTEXT_KEY } from './context'

interface ProgressBarTrackProps {
  class?: string
}

const props = defineProps<ProgressBarTrackProps>()
const context = inject(PROGRESS_BAR_CONTEXT_KEY, null)
const trackClass = computed(() => composeTwClasses(props.class, context?.slots.value.track()))
</script>

<template>
  <div :class="trackClass" data-slot="progress-bar-track">
    <slot />
  </div>
</template>
