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
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </slot>
  </span>
</template>
