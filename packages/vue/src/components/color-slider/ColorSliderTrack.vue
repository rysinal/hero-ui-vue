<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, onMounted, ref } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { COLOR_SLIDER_CONTEXT_KEY } from './context'

interface ColorSliderTrackProps {
  class?: string
}

const props = defineProps<ColorSliderTrackProps>()
const context = inject(COLOR_SLIDER_CONTEXT_KEY, null)

const trackRef = ref<HTMLElement | null>(null)
onMounted(() => context?.registerTrack(trackRef.value))

const trackClass = computed(() => composeTwClasses(props.class, context?.slots.value.track()))
const trackStyle = computed(() => ({ background: context?.trackBackground.value }))
</script>

<template>
  <div
    ref="trackRef"
    :class="trackClass"
    :data-disabled="dataAttr(context?.isDisabled.value)"
    :style="trackStyle"
    data-slot="color-slider-track"
    @pointerdown="context?.onTrackPointerDown($event)"
  >
    <slot />
  </div>
</template>
