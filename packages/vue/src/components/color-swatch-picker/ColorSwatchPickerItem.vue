<script setup lang="ts">
/* global KeyboardEvent */
import { computed, inject, provide } from 'vue'
import { composeTwClasses, dataAttr, toColor, type Color } from '../../utils'
import { COLOR_SWATCH_PICKER_ITEM_KEY, COLOR_SWATCH_PICKER_KEY } from './context'

interface ColorSwatchPickerItemProps {
  class?: string
  color: string | Color
  isDisabled?: boolean
}

const props = withDefaults(defineProps<ColorSwatchPickerItemProps>(), {
  isDisabled: false,
})

const picker = inject(COLOR_SWATCH_PICKER_KEY, null)

const color = computed(() => toColor(props.color))
const isSelected = computed(() => picker?.isSelected(color.value) ?? false)
const isDisabled = computed(() => props.isDisabled || (picker?.isDisabled.value ?? false))

const itemClass = computed(() => composeTwClasses(props.class, picker?.slots.value.item()))

provide(COLOR_SWATCH_PICKER_ITEM_KEY, {
  color,
  isSelected,
  slots: computed(() => picker?.slots.value ?? ({} as never)),
})

const choose = () => {
  if (isDisabled.value) return
  picker?.select(color.value)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  choose()
}
</script>

<template>
  <div
    :aria-disabled="dataAttr(isDisabled)"
    :aria-label="color.toString('css')"
    :aria-selected="isSelected"
    :class="itemClass"
    :data-disabled="dataAttr(isDisabled)"
    :data-selected="dataAttr(isSelected)"
    :tabindex="isDisabled ? undefined : 0"
    data-slot="color-swatch-picker-item"
    role="option"
    @click="choose"
    @keydown="handleKeydown"
  >
    <slot :color="color" :is-selected="isSelected" />
  </div>
</template>
