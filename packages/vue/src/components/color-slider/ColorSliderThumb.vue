<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { COLOR_SLIDER_CONTEXT_KEY } from './context'

interface ColorSliderThumbProps {
  class?: string
}

const props = defineProps<ColorSliderThumbProps>()
const context = inject(COLOR_SLIDER_CONTEXT_KEY, null)

const thumbClass = computed(() => composeTwClasses(props.class, context?.slots.value.thumb()))

const thumbStyle = computed(() => {
  const percent = (context?.percent.value ?? 0) * 100
  const isVertical = context?.orientation.value === 'vertical'
  return {
    '--color-slider-thumb-color': context?.value.value.toString('css'),
    ...(isVertical ? { bottom: `${percent}%` } : { left: `${percent}%` }),
  }
})

const range = computed(() => context?.value.value.getChannelRange(context.channel.value))
</script>

<template>
  <div
    :aria-disabled="dataAttr(context?.isDisabled.value)"
    :aria-valuemax="range?.maxValue"
    :aria-valuemin="range?.minValue"
    :aria-valuenow="context?.value.value.getChannelValue(context.channel.value)"
    :aria-valuetext="context?.value.value.toString('css')"
    :class="thumbClass"
    :data-disabled="dataAttr(context?.isDisabled.value)"
    :style="thumbStyle"
    :tabindex="context?.isDisabled.value ? undefined : 0"
    data-slot="color-slider-thumb"
    role="slider"
    @keydown="context?.onKeydown($event)"
  >
    <slot />
  </div>
</template>
