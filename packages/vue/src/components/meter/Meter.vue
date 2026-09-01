<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { meterVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import MeterTrack from './MeterTrack.vue'
import { METER_CONTEXT_KEY } from './context'

interface MeterProps {
  class?: string
  color?: 'default' | 'accent' | 'success' | 'warning' | 'danger'
  disabled?: boolean
  isDisabled?: boolean
  label?: string
  maxValue?: number
  minValue?: number
  showValueLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  value?: number
  /** Intl.NumberFormat options used to format the output. */
  formatOptions?: Intl.NumberFormatOptions
  /** Overrides the formatted output entirely. */
  valueLabel?: string
}

const props = withDefaults(defineProps<MeterProps>(), {
  disabled: undefined,
  isDisabled: undefined,
  maxValue: 100,
  minValue: 0,
  showValueLabel: true,
  value: 0,
})

const slots = computed(() => meterVariants({ color: props.color, size: props.size }))
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const percentage = computed(() => {
  const range = props.maxValue - props.minValue
  if (range <= 0) return 0
  return Math.min(100, Math.max(0, ((props.value - props.minValue) / range) * 100))
})
const valueText = computed(() => {
  if (props.valueLabel !== undefined) return props.valueLabel
  if (props.formatOptions) {
    return new Intl.NumberFormat(undefined, props.formatOptions).format(props.value)
  }
  return `${Math.round(percentage.value)}%`
})
const slotContent = useSlots()

/** True when the caller composed Meter.Track themselves. */
const hasComposedParts = computed(() => {
  const containsTrack = (list: unknown): boolean => {
    if (Array.isArray(list)) return list.some(containsTrack)
    const vnode = list as { type?: unknown; children?: unknown } | null
    if (!vnode || typeof vnode !== 'object') return false
    if (vnode.type === MeterTrack) return true
    return containsTrack(vnode.children)
  }
  try {
    return containsTrack(slotContent.default?.({}) ?? [])
  } catch {
    return false
  }
})

const meterClass = computed(() => composeTwClasses(props.class, slots.value.base()))

provide(METER_CONTEXT_KEY, {
  percentage: computed(() => percentage.value),
  slots,
  valueText: computed(() => valueText.value),
})
</script>

<template>
  <div
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-valuemax="props.maxValue"
    :aria-valuemin="props.minValue"
    :aria-valuenow="props.value"
    :aria-valuetext="valueText"
    :class="meterClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    data-slot="meter"
    role="meter"
  >
    <!-- Composed: render the caller's parts. Otherwise emit the default
         label / output / track shorthand. -->
    <slot v-if="hasComposedParts" />
    <template v-else>
      <span v-if="props.label || $slots.label" data-slot="label">
        <slot name="label">{{ props.label }}</slot>
      </span>
      <span v-if="props.showValueLabel" :class="slots.output()" data-slot="meter-output">
        <slot name="output">{{ valueText }}</slot>
      </span>
      <div :class="slots.track()" data-slot="meter-track">
        <div :class="slots.fill()" :style="{ width: `${percentage}%` }" data-slot="meter-fill" />
      </div>
    </template>
  </div>
</template>
