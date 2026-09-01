<script setup lang="ts">
import { computed, provide, shallowRef } from 'vue'
import { colorSwatchPickerVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, toColor, type Color } from '../../utils'
import { COLOR_SWATCH_PICKER_KEY } from './context'

interface ColorSwatchPickerProps {
  class?: string
  /** Selected colour. Supports `v-model`. */
  modelValue?: string | Color | null
  defaultValue?: string | Color | null
  layout?: 'grid' | 'stack'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'circle' | 'square'
  isDisabled?: boolean
}

const props = withDefaults(defineProps<ColorSwatchPickerProps>(), {
  defaultValue: null,
  isDisabled: false,
  layout: 'grid',
  modelValue: undefined,
  variant: 'circle',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: Color]
  change: [value: Color]
}>()

const normalize = (value: string | Color | null | undefined) =>
  value === null || value === undefined ? null : toColor(value)

const internalValue = shallowRef<Color | null>(normalize(props.defaultValue))
const value = computed(() =>
  props.modelValue === undefined ? internalValue.value : normalize(props.modelValue),
)

const slots = computed(() =>
  colorSwatchPickerVariants({ layout: props.layout, size: props.size, variant: props.variant }),
)
const pickerClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const select = (color: Color) => {
  if (props.isDisabled) return
  if (props.modelValue === undefined) internalValue.value = color
  emit('update:modelValue', color)
  emit('change', color)
}

provide(COLOR_SWATCH_PICKER_KEY, {
  isDisabled: computed(() => props.isDisabled),
  // Compare by css string; two Colors for the same colour are not identical.
  isSelected: (color: Color) => value.value?.toString('css') === color.toString('css'),
  select,
  slots,
  value,
})
</script>

<template>
  <div
    :class="pickerClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :data-layout="props.layout"
    data-slot="color-swatch-picker"
    role="listbox"
  >
    <slot :value="value" />
  </div>
</template>
