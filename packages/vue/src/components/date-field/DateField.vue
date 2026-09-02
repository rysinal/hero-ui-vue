<script setup lang="ts">
import { computed, provide, shallowRef } from 'vue'
import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { dateFieldVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { buildSegments, type DateGranularity } from '../date-input-group/segments'
import type { DateSegmentType } from '../date-input-group/context'
import { DATE_FIELD_CONTEXT_KEY } from './context'

interface DateFieldProps {
  class?: string
  /** Current date. Supports `v-model`. */
  modelValue?: DateValue | null
  defaultValue?: DateValue | null
  minValue?: DateValue
  maxValue?: DateValue
  granularity?: DateGranularity
  hourCycle?: 12 | 24
  locale?: string
  name?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<DateFieldProps>(), {
  defaultValue: null,
  fullWidth: false,
  granularity: 'day',
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
  'update:modelValue': [value: DateValue | null]
  change: [value: DateValue | null]
}>()

const internalValue = shallowRef<DateValue | null>(props.defaultValue)
const value = computed(() =>
  props.modelValue === undefined ? internalValue.value : props.modelValue,
)

const fieldClass = computed(() =>
  composeTwClasses(props.class, dateFieldVariants({ fullWidth: props.fullWidth })),
)

const segments = computed(() =>
  buildSegments(value.value, props.locale, props.granularity, props.hourCycle),
)

const isOutOfRange = computed(() => {
  const current = value.value
  if (!current) return false
  if (props.minValue && current.compare(props.minValue) < 0) return true
  if (props.maxValue && current.compare(props.maxValue) > 0) return true
  return false
})

const commit = (next: DateValue | null) => {
  if (props.modelValue === undefined) internalValue.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

/** Editing any part of an empty field starts from today. */
const baseline = () => value.value ?? today(getLocalTimeZone())

const applySegment = (type: DateSegmentType, apply: (current: DateValue) => DateValue) => {
  if (props.isDisabled || props.isReadOnly) return
  if (type === 'literal') return
  commit(apply(baseline()))
}

const withPart = (current: DateValue, type: DateSegmentType, next: number): DateValue => {
  const base = new CalendarDate(current.year, current.month, current.day)
  if (type === 'year') return base.set({ year: next })
  if (type === 'month') return base.set({ month: next })
  if (type === 'day') return base.set({ day: next })
  return base
}

const setSegment = (type: DateSegmentType, next: number) => {
  applySegment(type, (current) => withPart(current, type, next))
}

const adjustSegment = (type: DateSegmentType, delta: number) => {
  applySegment(type, (current) => {
    const base = new CalendarDate(current.year, current.month, current.day)
    if (type === 'year') return base.add({ years: delta })
    if (type === 'month') return base.add({ months: delta })
    if (type === 'day') return base.add({ days: delta })
    return base
  })
}

provide(DATE_FIELD_CONTEXT_KEY, {
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
    data-slot="date-field"
  >
    <slot :is-invalid="props.isInvalid || isOutOfRange" :segments="segments" :value="value" />
    <input v-if="props.name" :name="props.name" :value="value?.toString() ?? ''" type="hidden" />
  </div>
</template>
