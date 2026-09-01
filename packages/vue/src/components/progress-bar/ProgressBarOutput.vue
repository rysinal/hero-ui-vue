<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { PROGRESS_BAR_CONTEXT_KEY } from './context'

interface ProgressBarOutputProps {
  class?: string
}

const props = defineProps<ProgressBarOutputProps>()
const context = inject(PROGRESS_BAR_CONTEXT_KEY, null)
const outputClass = computed(() => composeTwClasses(props.class, context?.slots.value.output()))
</script>

<template>
  <span :class="outputClass" data-slot="progress-bar-output">
    <slot>{{ context?.valueText.value }}</slot>
  </span>
</template>
