<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { COLOR_SWATCH_PICKER_ITEM_KEY } from './context'

interface ColorSwatchPickerSwatchProps {
  class?: string
}

const props = defineProps<ColorSwatchPickerSwatchProps>()
const item = inject(COLOR_SWATCH_PICKER_ITEM_KEY, null)

const swatchClass = computed(() => composeTwClasses(props.class, item?.slots.value.swatch()))
const swatchStyle = computed(() => ({
  '--color-swatch-current': item?.color.value.toString('css'),
}))
</script>

<template>
  <div :class="swatchClass" :style="swatchStyle" data-slot="color-swatch-picker-swatch" />
</template>
