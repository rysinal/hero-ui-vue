<script setup lang="ts">
import { computed, provide, shallowRef } from 'vue'
import { Time } from '@internationalized/date'
import { timeFieldVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { buildTimeSegments, type TimeGranularity, type TimeValue } from '../date-input-group/segments'
import type { DateSegmentType } from '../date-input-group/context'
import { TIME_FIELD_CONTEXT_KEY } from './context'

interface TimeFieldProps {
  class?: string
  /** Current time. Supports `v-model`. */
  modelValue?: TimeValue | null
  defaultValue?: TimeValue | null
  minValue?: TimeValue
  maxValue?: TimeValue
  granularity?: TimeGranularity
  hourCycle?: 12 | 24
  locale?: string
  name?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<TimeFieldProps>(), {
  defaultValue: null,
  fullWidth: false,
  granularity: 'minute',
  hourCycle: 12,
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
  locale: 'en-US',
  maxValue: undefined,
  minValue: undefined,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: TimeValue | null]
  change: [value: TimeValue | null]
}>()

// shallowRef: Time is a class instance, and a deep ref would hand out a new
// proxy on every access and strip the brand off it.
const internalValue = shallowRef<TimeValue | null>(props.defaultValue)
const value = computed(() =>
  props.modelValue === undefined ? internalValue.value : props.modelValue,
)

const fieldClass = computed(() =>
  composeTwClasses(props.class, timeFieldVariants({ fullWidth: props.fullWidth })),
)

const segments = computed(() =>
  buildTimeSegments(value.value, props.locale, props.granularity, props.hourCycle),
)

/** Seconds since midnight, so the bounds compare by clock position alone. */
const clockPosition = (time: TimeValue) =>
  time.hour * 3600 + time.minute * 60 + time.second

const isOutOfRange = computed(() => {
  const current = value.value
  if (!current) return false
  const now = clockPosition(current)
  if (props.minValue && now < clockPosition(props.minValue)) return true
  if (props.maxValue && now > clockPosition(props.maxValue)) return true
  return false
})

const commit = (next: TimeValue | null) => {
  if (props.modelValue === undefined) internalValue.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

/** Editing any part of an empty field starts from midnight. */
const baseline = (): TimeValue => value.value ?? new Time(0, 0, 0)

const applySegment = (type: DateSegmentType, apply: (current: TimeValue) => TimeValue) => {
  if (props.isDisabled || props.isReadOnly) return
  if (type === 'literal') return
  commit(apply(baseline()))
}

const setSegment = (type: DateSegmentType, next: number) => {
  applySegment(type, (current) => {
    if (type === 'hour') {
      // On a 12-hour clock the segment reads 1-12, so the half of the day the
      // field is already in has to be preserved.
      const hour =
        props.hourCycle === 12
          ? (next % 12) + (current.hour >= 12 ? 12 : 0)
          : next
      return current.set({ hour })
    }
    if (type === 'minute') return current.set({ minute: next })
    if (type === 'second') return current.set({ second: next })
    return current
  })
}

const adjustSegment = (type: DateSegmentType, delta: number) => {
  applySegment(type, (current) => {
    if (type === 'hour') return current.add({ hours: delta })
    if (type === 'minute') return current.add({ minutes: delta })
    if (type === 'second') return current.add({ seconds: delta })
    // The day period has only two states, so either arrow flips it.
    if (type === 'dayPeriod') return current.add({ hours: current.hour >= 12 ? -12 : 12 })
    return current
  })
}

provide(TIME_FIELD_CONTEXT_KEY, {
  adjustSegment,
  isDisabled: computed(() => props.isDisabled),
  isInvalid: computed(() => props.isInvalid || isOutOfRange.value),
  isReadOnly: computed(() => props.isReadOnly),
  isRequired: computed(() => props.isRequired),
  segments,
  setSegment,
  value,
})
</script>

<template>
  <div
    :class="fieldClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :data-invalid="dataAttr(props.isInvalid || isOutOfRange)"
    :data-required="dataAttr(props.isRequired)"
    data-slot="time-field"
  >
    <slot :segments="segments" :value="value" />
    <input v-if="props.name" :name="props.name" :value="value?.toString() ?? ''" type="hidden" />
  </div>
</template>
