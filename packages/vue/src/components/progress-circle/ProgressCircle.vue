<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { progressCircleVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import ProgressCircleTrack from './ProgressCircleTrack.vue'
import { PROGRESS_CIRCLE_CONTEXT_KEY } from './context'

interface ProgressCircleProps {
  class?: string
  color?: 'default' | 'accent' | 'success' | 'warning' | 'danger'
  disabled?: boolean
  isDisabled?: boolean
  maxValue?: number
  minValue?: number
  size?: 'sm' | 'md' | 'lg'
  value?: number
  /** Renders the indeterminate animation regardless of value. */
  isIndeterminate?: boolean
  /** Intl.NumberFormat options used to format the accessible value text. */
  formatOptions?: Intl.NumberFormatOptions
  /** Overrides the formatted value text entirely. */
  valueLabel?: string
}

const props = withDefaults(defineProps<ProgressCircleProps>(), {
  disabled: undefined,
  isDisabled: undefined,
  isIndeterminate: undefined,
  maxValue: 100,
  minValue: 0,
})

const slots = computed(() => progressCircleVariants({ color: props.color, size: props.size }))
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const isIndeterminate = computed(() => props.isIndeterminate ?? props.value === undefined)

// Keep these in sync with the React source (progress-circle.tsx).
const STROKE_WIDTH = 4
const CENTER = 18
const RADIUS = CENTER - STROKE_WIDTH / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const percentage = computed(() => {
  if (isIndeterminate.value) return undefined
  const range = props.maxValue - props.minValue
  if (range <= 0) return 0
  return Math.min(100, Math.max(0, ((props.value! - props.minValue) / range) * 100))
})
const dashOffset = computed(() =>
  percentage.value === undefined
    ? CIRCUMFERENCE * 0.75
    : CIRCUMFERENCE - (percentage.value / 100) * CIRCUMFERENCE,
)
const slotContent = useSlots()

/** True when the caller composed ProgressCircle.Track themselves. */
const hasComposedParts = computed(() => {
  const containsTrack = (list: unknown): boolean => {
    if (Array.isArray(list)) return list.some(containsTrack)
    const vnode = list as { type?: unknown; children?: unknown } | null
    if (!vnode || typeof vnode !== 'object') return false
    if (vnode.type === ProgressCircleTrack) return true
    return containsTrack(vnode.children)
  }
  try {
    return containsTrack(slotContent.default?.({}) ?? [])
  } catch {
    return false
  }
})

const circleClass = computed(() => composeTwClasses(props.class, slots.value.base()))

provide(PROGRESS_CIRCLE_CONTEXT_KEY, {
  geometry: computed(() => ({
    center: CENTER,
    circumference: CIRCUMFERENCE,
    dashOffset: dashOffset.value,
    radius: RADIUS,
    strokeWidth: STROKE_WIDTH,
  })),
  slots,
})
</script>

<template>
  <div
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-valuemax="props.maxValue"
    :aria-valuemin="props.minValue"
    :aria-valuenow="isIndeterminate ? undefined : props.value"
    :class="circleClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    data-slot="progress-circle"
    role="progressbar"
  >
    <!-- Composed: render the caller's parts. Otherwise emit the default svg. -->
    <slot v-if="hasComposedParts" />
    <template v-else>
      <svg
        :class="slots.track()"
        :viewBox="`0 0 ${CENTER * 2} ${CENTER * 2}`"
        data-slot="progress-circle-track"
        fill="none"
      >
        <circle
          :class="slots.trackCircle()"
          :cx="CENTER"
          :cy="CENTER"
          :r="RADIUS"
          :stroke-width="STROKE_WIDTH"
          data-slot="progress-circle-track-circle"
          fill="none"
        />
        <circle
          :class="slots.fillCircle()"
          :cx="CENTER"
          :cy="CENTER"
          :r="RADIUS"
          :stroke-dasharray="CIRCUMFERENCE"
          :stroke-dashoffset="dashOffset"
          :stroke-width="STROKE_WIDTH"
          :transform="`rotate(-90 ${CENTER} ${CENTER})`"
          data-slot="progress-circle-fill-circle"
          fill="none"
          stroke-linecap="round"
        />
      </svg>
    </template>
  </div>
</template>
