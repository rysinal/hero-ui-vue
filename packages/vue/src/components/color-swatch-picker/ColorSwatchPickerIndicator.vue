<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
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
</script>

<template>
  <span
    v-if="isSelected"
    :class="indicatorClass"
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
