<script setup lang="ts">
import { computed, inject } from 'vue'
import { SliderTrack as RadixSliderTrack } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SLIDER_CONTEXT_KEY } from './context'

interface SliderTrackProps {
  class?: string
}

const props = defineProps<SliderTrackProps>()
const context = inject(SLIDER_CONTEXT_KEY, null)

const trackClass = computed(() => composeTwClasses(props.class, context?.slots.value.track()))
const state = computed(() => context?.state.value)

const offsets = computed(() => {
  const percents = state.value?.percents ?? [0]
  const isRange = percents.length > 1
  const start = isRange ? Math.min(...percents) : 0
  const end = isRange ? Math.max(...percents) : (percents[0] ?? 0)
  return { end, isRange, start }
})

// slider.css rounds the fill differently depending on whether it reaches an
// end of the track, so mirror React's data-fill-start / data-fill-end logic.
const fillStart = computed(() => {
  const { end, isRange, start } = offsets.value
  return isRange ? start === 0 : (end - start) > 0
})

const fillEnd = computed(() => {
  const { end, isRange, start } = offsets.value
  const fill = (end - start) * 100
  return isRange ? start * 100 + fill === 100 : fill === 100
})
</script>

<template>
  <RadixSliderTrack
    :class="trackClass"
    :data-disabled="dataAttr(state?.isDisabled)"
    :data-fill-end="dataAttr(fillEnd)"
    :data-fill-start="dataAttr(fillStart)"
    data-slot="slider-track"
  >
    <slot v-bind="state ?? {}" />
  </RadixSliderTrack>
</template>
