<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { COLOR_SWATCH_PICKER_ITEM_KEY } from './context'

interface ColorSwatchPickerIndicatorProps {
  class?: string
}

const props = defineProps<ColorSwatchPickerIndicatorProps>()
const item = inject(COLOR_SWATCH_PICKER_ITEM_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, item?.slots.value.indicator()),
)
const isSelected = computed(() => item?.isSelected.value ?? false)

/**
 * Relative luminance, the same formula React uses. The checkmark defaults to
 * white, so a light swatch needs it switched to black — the stylesheet does that
 * from `[data-light-color="true"]`, which is why this has to be exposed.
 */
const isLightColor = computed(() => {
  const color = item?.color.value
  if (!color) return false

  const red = color.getChannelValue('red')
  const green = color.getChannelValue('green')
  const blue = color.getChannelValue('blue')

  return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255 > 0.5
})
</script>

<template>
  <span
    v-if="isSelected"
    :class="indicatorClass"
    :data-light-color="dataAttr(isLightColor)"
    aria-hidden="true"
    data-slot="color-swatch-picker-indicator"
  >
    <slot>
      <!-- Geometry matches React's: a 12-unit box with a polyline tick. -->
      <svg
        aria-hidden="true"
        data-slot="color-swatch-picker-checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 12 12"
      >
        <polyline points="2.5 6 5 8.5 9.5 3" />
      </svg>
    </slot>
  </span>
</template>
