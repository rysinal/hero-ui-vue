<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { SLIDER_CONTEXT_KEY } from './context'

interface SliderMarksProps {
  class?: string
}

const props = defineProps<SliderMarksProps>()
const context = inject(SLIDER_CONTEXT_KEY, null)

const marksClass = computed(() => composeTwClasses(props.class, context?.slots.value.marks()))
</script>

<template>
  <div :class="marksClass" data-slot="slider-marks">
    <slot />
  </div>
</template>
