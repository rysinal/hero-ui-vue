<script setup lang="ts">
import { computed, provide, ref, shallowRef } from 'vue'
import { PopoverRoot } from 'radix-vue'
import { colorPickerVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, toColor, type Color } from '../../utils'
import { COLOR_PICKER_CONTEXT_KEY } from './context'

interface ColorPickerProps {
  class?: string
  /** Current colour. Supports `v-model`. */
  modelValue?: string | Color
  defaultValue?: string | Color
  isOpen?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  defaultOpen: false,
  defaultValue: '#000000',
  isOpen: undefined,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: Color]
  'update:isOpen': [value: boolean]
  change: [value: Color]
  openChange: [value: boolean]
}>()

const internalValue = shallowRef<Color>(toColor(props.defaultValue))
const value = computed(() =>
  props.modelValue === undefined ? internalValue.value : toColor(props.modelValue),
)

const internalOpen = ref(props.defaultOpen)
const isOpen = computed(() => props.isOpen ?? internalOpen.value)

const slots = computed(() => colorPickerVariants())
const pickerClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const setValue = (color: Color) => {
  if (props.modelValue === undefined) internalValue.value = color
  emit('update:modelValue', color)
  emit('change', color)
}

const setOpen = (open: boolean) => {
  internalOpen.value = open
  emit('update:isOpen', open)
  emit('openChange', open)
}

provide(COLOR_PICKER_CONTEXT_KEY, { isOpen, setOpen, setValue, slots, value })
</script>

<template>
  <PopoverRoot :open="isOpen" @update:open="setOpen">
    <div :class="pickerClass" data-slot="color-picker">
      <slot :value="value" />
    </div>
  </PopoverRoot>
</template>
