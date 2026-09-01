<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { SliderRoot as RadixSliderRoot } from 'radix-vue'
import { sliderVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { SLIDER_CONTEXT_KEY, type SliderOrientation } from './context'

interface SliderProps {
  /** Element to render as the root. React exposes this as `render`. */
  as?: string
  class?: string
  /** Controlled value. Pass an array for a range. Supports `v-model`. */
  modelValue?: number | number[]
  defaultValue?: number | number[]
  minValue?: number
  maxValue?: number
  step?: number
  orientation?: SliderOrientation
  isDisabled?: boolean
  /** Intl.NumberFormat options used for the output label. */
  formatOptions?: Intl.NumberFormatOptions
}

const props = withDefaults(defineProps<SliderProps>(), {
  as: undefined,
  defaultValue: undefined,
  isDisabled: false,
  maxValue: 100,
  minValue: 0,
  modelValue: undefined,
  orientation: 'horizontal',
  step: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | number[]]
  change: [value: number | number[]]
}>()

const toArray = (value: number | number[] | undefined): number[] | undefined => {
  if (value === undefined) return undefined
  return Array.isArray(value) ? [...value] : [value]
}

// radix always works with an array; remember whether the caller used a scalar
// so we can hand the same shape back.
const isScalar = computed(() => {
  const source = props.modelValue ?? props.defaultValue
  return source === undefined || !Array.isArray(source)
})

// Without modelValue the slider owns its value, so keep it here; otherwise
// the root would re-render the same defaultValue and freeze the thumb.
const internalValues = ref<number[]>(toArray(props.defaultValue) ?? [props.minValue])

const isControlled = computed(() => props.modelValue !== undefined)

const values = computed(() => toArray(props.modelValue) ?? internalValues.value)

const slots = computed(() => sliderVariants())

const percents = computed(() => {
  const range = props.maxValue - props.minValue
  if (range <= 0) return values.value.map(() => 0)
  return values.value.map((value) =>
    Math.min(1, Math.max(0, (value - props.minValue) / range)),
  )
})

const labels = computed(() => {
  const formatter = props.formatOptions
    ? new Intl.NumberFormat(undefined, props.formatOptions)
    : undefined
  return values.value.map((value) => (formatter ? formatter.format(value) : String(value)))
})

provide(SLIDER_CONTEXT_KEY, {
  slots,
  state: computed(() => ({
    isDisabled: props.isDisabled,
    labels: labels.value,
    orientation: props.orientation,
    percents: percents.value,
    values: values.value,
  })),
})

const sliderClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const handleChange = (next: number[] | undefined) => {
  if (!next) return

  if (!isControlled.value) internalValues.value = [...next]

  const payload = isScalar.value ? (next[0] ?? props.minValue) : next
  emit('update:modelValue', payload)
  emit('change', payload)
}
</script>

<template>
  <RadixSliderRoot
    :as="props.as"
    :class="sliderClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :disabled="props.isDisabled"
    :max="props.maxValue"
    :min="props.minValue"
    :model-value="values"
    :orientation="props.orientation"
    :step="props.step"
    data-slot="slider"
    @update:model-value="handleChange"
  >
    <slot :labels="labels" :percents="percents" :values="values" />
  </RadixSliderRoot>
</template>
