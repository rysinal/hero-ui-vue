<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { progressBarVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import ProgressBarTrack from './ProgressBarTrack.vue'
import { PROGRESS_BAR_CONTEXT_KEY } from './context'

interface ProgressBarProps {
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
  /** Renders the indeterminate animation regardless of value. */
  isIndeterminate?: boolean
  /** Intl.NumberFormat options used to format the output. */
  formatOptions?: Intl.NumberFormatOptions
  /** Overrides the formatted output entirely. */
  valueLabel?: string
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  disabled: undefined,
  isDisabled: undefined,
  isIndeterminate: undefined,
  maxValue: 100,
  minValue: 0,
  showValueLabel: true,
})

const slots = computed(() => progressBarVariants({ color: props.color, size: props.size }))
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const isIndeterminate = computed(() => props.isIndeterminate ?? props.value === undefined)
const percentage = computed(() => {
  if (isIndeterminate.value) return undefined
  const range = props.maxValue - props.minValue
  if (range <= 0) return 0
  return Math.min(100, Math.max(0, ((props.value! - props.minValue) / range) * 100))
})
const valueText = computed(() => {
  if (props.valueLabel !== undefined) return props.valueLabel
  if (percentage.value === undefined) return undefined
  if (props.formatOptions) {
    return new Intl.NumberFormat(undefined, props.formatOptions).format(props.value ?? 0)
  }
  return `${Math.round(percentage.value)}%`
})
const slotContent = useSlots()

/** True when the caller composed ProgressBar.Track themselves. */
const hasComposedParts = computed(() => {
  const containsTrack = (list: unknown): boolean => {
    if (Array.isArray(list)) return list.some(containsTrack)
    const vnode = list as { type?: unknown; children?: unknown } | null
    if (!vnode || typeof vnode !== 'object') return false
    if (vnode.type === ProgressBarTrack) return true
    return containsTrack(vnode.children)
  }
  try {
    return containsTrack(slotContent.default?.({}) ?? [])
  } catch {
    return false
  }
})

const progressClass = computed(() => composeTwClasses(props.class, slots.value.base()))

provide(PROGRESS_BAR_CONTEXT_KEY, {
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
    :aria-valuenow="isIndeterminate ? undefined : props.value"
    :aria-valuetext="valueText"
    :class="progressClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    data-slot="progress-bar"
    role="progressbar"
  >
    <!-- Composed: render the caller's parts. Otherwise emit the default
         label / output / track shorthand. -->
    <slot v-if="hasComposedParts" />
    <template v-else>
      <span v-if="props.label || $slots.label" data-slot="label">
        <slot name="label">{{ props.label }}</slot>
      </span>
      <span
        v-if="props.showValueLabel && !isIndeterminate"
        :class="slots.output()"
        data-slot="progress-bar-output"
      >
        <slot name="output">{{ valueText }}</slot>
      </span>
      <div :class="slots.track()" data-slot="progress-bar-track">
        <div
          :class="slots.fill()"
          :style="{ width: isIndeterminate ? undefined : `${percentage}%` }"
          data-slot="progress-bar-fill"
        />
      </div>
    </template>
  </div>
</template>
