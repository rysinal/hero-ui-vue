<script setup lang="ts">
/* global HTMLElement, KeyboardEvent, window, requestAnimationFrame */
import { computed, onBeforeUnmount, provide, ref, shallowRef, watch } from 'vue'
import {
  CalendarDate,
  getLocalTimeZone,
  today,
  type DateValue,
} from '@internationalized/date'
import { dateRangePickerVariants } from '@rysinal/heroui-vue-styles'
import { PopoverRoot } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { DATE_INPUT_GROUP_KEY, type DateRangeEnd, type DateSegmentType } from '../date-input-group/context'
import { buildSegments, type DateGranularity } from '../date-input-group/segments'
import { dateInputGroupVariants } from '@rysinal/heroui-vue-styles'
import { RANGE_SELECTION_HOST_KEY } from '../range-calendar/context'
import type { DateRange } from '../range-calendar/RangeCalendar.vue'
import { DATE_RANGE_PICKER_CONTEXT_KEY } from './context'

interface DateRangePickerProps {
  class?: string
  /** Selected range. Supports `v-model`. */
  modelValue?: DateRange | null
  defaultValue?: DateRange | null
  minValue?: DateValue
  maxValue?: DateValue
  granularity?: DateGranularity
  hourCycle?: 12 | 24
  locale?: string
  /** Form field names for each end, as React splits them. */
  startName?: string
  endName?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  /** Popover open state. Supports `v-model:is-open`. */
  isOpen?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<DateRangePickerProps>(), {
  defaultOpen: false,
  defaultValue: null,
  endName: undefined,
  granularity: 'day',
  hourCycle: 12,
  isDisabled: false,
  isInvalid: false,
  isOpen: undefined,
  isReadOnly: false,
  isRequired: false,
  locale: 'en-US',
  maxValue: undefined,
  minValue: undefined,
  modelValue: undefined,
  startName: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: DateRange | null]
  'update:isOpen': [value: boolean]
  change: [value: DateRange | null]
  openChange: [value: boolean]
}>()

const slots = computed(() => dateRangePickerVariants())
const pickerClass = computed(() => composeTwClasses(props.class, slots.value.base()))

// shallowRef: the range holds DateValue class instances.
const internalValue = shallowRef<DateRange | null>(props.defaultValue)
const value = computed(() =>
  props.modelValue === undefined ? internalValue.value : props.modelValue,
)

const internalOpen = ref(props.defaultOpen)
const isOpen = computed(() => props.isOpen ?? internalOpen.value)

const triggerRef = ref<HTMLElement | null>(null)
const shouldRestoreFocus = ref(false)

const setOpen = (next: boolean) => {
  if (props.isOpen === undefined) internalOpen.value = next
  emit('update:isOpen', next)
  emit('openChange', next)

  if (!next && shouldRestoreFocus.value) {
    requestAnimationFrame(() => triggerRef.value?.focus())
  }
  shouldRestoreFocus.value = false
}

const markKeyboardIntent = (event: KeyboardEvent) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return
  shouldRestoreFocus.value = true
}

watch(isOpen, (open) => {
  if (open) window.addEventListener('keydown', markKeyboardIntent, true)
  else window.removeEventListener('keydown', markKeyboardIntent, true)
})

onBeforeUnmount(() => window.removeEventListener('keydown', markKeyboardIntent, true))

/** Each end gets its own segment list, tagged so edits land on the right side. */
const segmentsFor = (end: DateRangeEnd) => {
  const date = end === 'start' ? (value.value?.start ?? null) : (value.value?.end ?? null)
  return buildSegments(date, props.locale, props.granularity, props.hourCycle).map((segment) => ({
    ...segment,
    end,
  }))
}

const startSegments = computed(() => segmentsFor('start'))
const endSegments = computed(() => segmentsFor('end'))

const isOutOfRange = computed(() => {
  const current = value.value
  if (!current) return false
  if (props.minValue && current.start.compare(props.minValue) < 0) return true
  if (props.maxValue && current.end.compare(props.maxValue) > 0) return true
  return false
})

const commit = (next: DateRange | null) => {
  if (props.modelValue === undefined) internalValue.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

const applySegment = (
  type: DateSegmentType,
  end: DateRangeEnd,
  apply: (current: DateValue) => DateValue,
) => {
  if (props.isDisabled || props.isReadOnly) return
  if (type === 'literal') return

  // Editing an empty range starts both ends from today.
  const current = value.value ?? { end: today(getLocalTimeZone()), start: today(getLocalTimeZone()) }
  const edited = apply(end === 'start' ? current.start : current.end)

  const next: DateRange =
    end === 'start' ? { end: current.end, start: edited } : { end: edited, start: current.start }

  // Keep the ends ordered, as react-aria does while typing.
  commit(next.start.compare(next.end) <= 0 ? next : { end: next.start, start: next.end })
}

const withPart = (current: DateValue, type: DateSegmentType, next: number): DateValue => {
  const base = new CalendarDate(current.year, current.month, current.day)
  if (type === 'year') return base.set({ year: next })
  if (type === 'month') return base.set({ month: next })
  if (type === 'day') return base.set({ day: next })
  return base
}

const setSegment = (type: DateSegmentType, next: number, end: DateRangeEnd = 'start') => {
  applySegment(type, end, (current) => withPart(current, type, next))
}

const adjustSegment = (type: DateSegmentType, delta: number, end: DateRangeEnd = 'start') => {
  applySegment(type, end, (current) => {
    const base = new CalendarDate(current.year, current.month, current.day)
    if (type === 'year') return base.add({ years: delta })
    if (type === 'month') return base.add({ months: delta })
    if (type === 'day') return base.add({ days: delta })
    return base
  })
}

/** Completing a range in the calendar fills both fields and dismisses. */
const selectFromCalendar = (range: DateRange) => {
  commit(range)
  setOpen(false)
}

// DateField.Group sits inside, so the group context is provided directly rather
// than going through a field. segmentsFor lets each input show only its own end.
provide(DATE_INPUT_GROUP_KEY, {
  adjustSegment,
  isDisabled: computed(() => props.isDisabled),
  isInvalid: computed(() => props.isInvalid || isOutOfRange.value),
  isReadOnly: computed(() => props.isReadOnly),
  segments: startSegments,
  segmentsFor,
  setSegment,
  slots: computed(() => dateInputGroupVariants({ fullWidth: true })),
  value: computed(() => value.value?.start ?? null),
})

provide(DATE_RANGE_PICKER_CONTEXT_KEY, {
  isOpen,
  setOpen,
  shouldRestoreFocus,
  slots,
  triggerRef,
})

provide(RANGE_SELECTION_HOST_KEY, {
  select: selectFromCalendar,
  value,
})
</script>

<template>
  <PopoverRoot :open="isOpen" @update:open="setOpen">
    <div
      :class="pickerClass"
      :data-disabled="dataAttr(props.isDisabled)"
      :data-invalid="dataAttr(props.isInvalid || isOutOfRange)"
      :data-required="dataAttr(props.isRequired)"
      data-slot="date-range-picker"
    >
      <slot
        :end-segments="endSegments"
        :is-open="isOpen"
        :start-segments="startSegments"
        :value="value"
      />
      <input
        v-if="props.startName"
        :name="props.startName"
        :value="value?.start.toString() ?? ''"
        type="hidden"
      />
      <input
        v-if="props.endName"
        :name="props.endName"
        :value="value?.end.toString() ?? ''"
        type="hidden"
      />
    </div>
  </PopoverRoot>
</template>
