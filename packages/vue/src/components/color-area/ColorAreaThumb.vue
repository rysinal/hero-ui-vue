<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { COLOR_AREA_CONTEXT_KEY } from './context'

interface ColorAreaThumbProps {
  class?: string
}

const props = defineProps<ColorAreaThumbProps>()
const context = inject(COLOR_AREA_CONTEXT_KEY, null)

const thumbClass = computed(() => composeTwClasses(props.class, context?.slots.value.thumb()))

const thumbStyle = computed(() => {
  const position = context?.position.value ?? { x: 0, y: 0 }
  return {
    '--color-area-thumb-color': context?.value.value.toString('css'),
    left: `${position.x * 100}%`,
    top: `${position.y * 100}%`,
  }
})
</script>

<template>
  <div
    :aria-label="context?.value.value.toString('css')"
    :aria-valuetext="context?.value.value.toString('css')"
    :class="thumbClass"
    :data-disabled="dataAttr(context?.isDisabled.value)"
    :style="thumbStyle"
    :tabindex="context?.isDisabled.value ? undefined : 0"
    data-slot="color-area-thumb"
    role="slider"
  >
    <slot />
  </div>
</template>
