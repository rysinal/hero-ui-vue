<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SLIDER_CONTEXT_KEY } from './context'

interface SliderFillProps {
  class?: string
}

const props = defineProps<SliderFillProps>()
const context = inject(SLIDER_CONTEXT_KEY, null)

const fillClass = computed(() => composeTwClasses(props.class, context?.slots.value.fill()))
const state = computed(() => context?.state.value)

const fillStyle = computed(() => {
  const percents = state.value?.percents ?? [0]
  const isRange = percents.length > 1
  const start = isRange ? Math.min(...percents) : 0
  const end = isRange ? Math.max(...percents) : (percents[0] ?? 0)
  const isVertical = state.value?.orientation === 'vertical'
  // Percentages come from float division; trim the noise so the style string
  // reads as "55%" rather than "55.00000000000001%".
  const round = (value: number) => `${Number((value * 100).toFixed(4))}%`
  const size = round(end - start)

  return isVertical
    ? { bottom: round(start), height: size }
    : { left: round(start), width: size }
})
</script>

<template>
  <div
    :class="fillClass"
    :data-disabled="dataAttr(state?.isDisabled)"
    :style="fillStyle"
    data-slot="slider-fill"
  />
</template>
