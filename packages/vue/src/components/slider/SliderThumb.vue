<script setup lang="ts">
import { computed, inject } from 'vue'
import { SliderThumb as RadixSliderThumb } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { SLIDER_CONTEXT_KEY } from './context'

interface SliderThumbProps {
  class?: string
}

const props = defineProps<SliderThumbProps>()
const context = inject(SLIDER_CONTEXT_KEY, null)

const thumbClass = computed(() => composeTwClasses(props.class, context?.slots.value.thumb()))
</script>

<template>
  <RadixSliderThumb :class="thumbClass" data-slot="slider-thumb">
    <slot />
  </RadixSliderThumb>
</template>
