<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { COLOR_SLIDER_CONTEXT_KEY } from './context'

interface ColorSliderOutputProps {
  class?: string
}

const props = defineProps<ColorSliderOutputProps>()
const context = inject(COLOR_SLIDER_CONTEXT_KEY, null)

const outputClass = computed(() => composeTwClasses(props.class, context?.slots.value.output()))

// React shows the channel's own value, not the whole colour.
const label = computed(() => {
  if (!context) return ''
  const channel = context.channel.value
  const current = context.value.value.getChannelValue(channel)
  const suffix = channel === 'hue' ? '°' : channel === 'alpha' ? '' : '%'
  const isByte = channel === 'red' || channel === 'green' || channel === 'blue'
  return isByte || channel === 'alpha' ? String(current) : `${Math.round(current)}${suffix}`
})
</script>

<template>
  <output :class="outputClass" data-slot="color-slider-output">
    <slot :value="context?.value.value">{{ label }}</slot>
  </output>
</template>
