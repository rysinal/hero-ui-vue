<script setup lang="ts">
import { computed, inject, provide, ref, shallowRef } from 'vue'
import {
  CalendarDate,
  getLocalTimeZone,
  isSameDay,
  startOfMonth,
  today,
  type DateValue,
} from '@internationalized/date'
import { rangeCalendarVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, getGregorianYearOffset } from '../../utils'
import { YEAR_PICKER_CONTEXT_KEY } from '../calendar-year-picker/context'
import { CALENDAR_CONTEXT_KEY } from '../calendar/context'
import { RANGE_SELECTION_HOST_KEY } from './context'

export interface DateRange {
  start: DateValue
  end: DateValue
}

interface RangeCalendarProps {
  class?: string
  /** Selected range. Supports `v-model`. */
  modelValue?: DateRange | null
  defaultValue?: DateRange | null
  focusedValue?: DateValue
  defaultFocusedValue?: DateValue
  minValue?: DateValue
  maxValue?: DateValue
  isDateUnavailable?: (date: DateValue) => boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  /** Lets a range span days that are themselves unavailable. */
  allowsNonContiguousRanges?: boolean
  visibleMonths?: number
  locale?: string
}

const props = withDefaults(defineProps<RangeCalendarProps>(), {
  allowsNonContiguousRanges: false,
  defaultFocusedValue: undefined,
  defaultValue: null,
  focusedValue: undefined,
  isDateUnavailable: undefined,
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  locale: 'en-US',
  maxValue: undefined,
  minValue: undefined,
  modelValue: undefined,
  visibleMonths: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: DateRange]
  'update:focusedValue': [value: DateValue]
  change: [value: DateRange]
}>()

const toCalendar = (date: DateValue): CalendarDate =>
  new CalendarDate(date.year, date.month, date.day)

const internalValue = shallowRef<DateRange | null>(props.defaultValue)
// A host such as DateRangePicker owns the range and merely borrows this
// calendar to present it; without one the calendar keeps its own.
const host = inject(RANGE_SELECTION_HOST_KEY, null)
const value = computed(() => {
  if (host) return host.value.value
  return props.modelValue === undefined ? internalValue.value : props.modelValue
})

/** The first click of a new range, before the second click completes it. */
const anchor = shallowRef<CalendarDate | null>(null)

const initialFocus =
  props.defaultFocusedValue ?? props.defaultValue?.start ?? today(getLocalTimeZone())
const internalFocused = shallowRef<CalendarDate>(toCalendar(initialFocus))
const focusedDate = computed(() =>
  props.focusedValue === undefined ? internalFocused.value : toCalendar(props.focusedValue),
)

const slots = computed(() => rangeCalendarVariants())
const calendarClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const visibleMonths = computed(() => {
  const first = startOfMonth(focusedDate.value)
  return Array.from({ length: props.visibleMonths }, (_, index) =>
    startOfMonth(first.add({ months: index })),
  )
})

const isDateOutOfRange = (date: DateValue) => {
  if (props.minValue && date.compare(props.minValue) < 0) return true
  if (props.maxValue && date.compare(props.maxValue) > 0) return true
  return false
}

const isDateUnavailable = (date: DateValue) => props.isDateUnavailable?.(date) ?? false

const setFocusedDate = (date: CalendarDate) => {
  if (props.focusedValue === undefined) internalFocused.value = date
  emit('update:focusedValue', date)
}

const commit = (range: DateRange) => {
  if (host) {
    host.select(range)
    return
  }
  if (props.modelValue === undefined) internalValue.value = range
  emit('update:modelValue', range)
  emit('change', range)
}

/** Refuses a range that steps over an unavailable day, unless allowed. */
const spanIsSelectable = (start: DateValue, end: DateValue) => {
  if (props.allowsNonContiguousRanges || !props.isDateUnavailable) return true

  let cursor = toCalendar(start)
  const last = toCalendar(end)
  while (cursor.compare(last) <= 0) {
    if (props.isDateUnavailable(cursor)) return false
    cursor = cursor.add({ days: 1 })
  }
  return true
}

const select = (date: CalendarDate) => {
  if (props.isDisabled || props.isReadOnly) return
  if (isDateOutOfRange(date) || isDateUnavailable(date)) return

  // First click anchors the range; the second completes it.
  if (!anchor.value) {
    anchor.value = date
    setFocusedDate(date)
    return
  }

  const [start, end] = anchor.value.compare(date) <= 0 ? [anchor.value, date] : [date, anchor.value]
  anchor.value = null

  if (!spanIsSelectable(start, end)) return

  commit({ end, start })
  setFocusedDate(date)
}

const canGoPrevious = computed(() => {
  if (!props.minValue) return true
  const previous = startOfMonth(focusedDate.value).subtract({ months: 1 })
  return previous.add({ months: 1 }).subtract({ days: 1 }).compare(props.minValue) >= 0
})

const canGoNext = computed(() => {
  if (!props.maxValue) return true
  return startOfMonth(focusedDate.value)
    .add({ months: props.visibleMonths })
    .compare(props.maxValue) <= 0
})

const inRange = (date: DateValue) => {
  const range = value.value
  if (!range) return false
  return date.compare(range.start) >= 0 && date.compare(range.end) <= 0
}

// Reuse Calendar's context so every Calendar part works unchanged.
provide(CALENDAR_CONTEXT_KEY, {
  canGoNext,
  canGoPrevious,
  focusedDate,
  goToNextMonth: () => {
    if (canGoNext.value) setFocusedDate(startOfMonth(focusedDate.value).add({ months: 1 }))
  },
  goToPreviousMonth: () => {
    if (canGoPrevious.value) setFocusedDate(startOfMonth(focusedDate.value).subtract({ months: 1 }))
  },
  isDateOutOfRange,
  isDateUnavailable,
  isDisabled: computed(() => props.isDisabled),
  isInRange: inRange,
  isRangeEnd: (date) => (value.value ? isSameDay(date, value.value.end) : false),
  isRangeStart: (date) => (value.value ? isSameDay(date, value.value.start) : false),
  isReadOnly: computed(() => props.isReadOnly),
  isSelected: (date) => {
    if (anchor.value && isSameDay(date, anchor.value)) return true
    return inRange(date)
  },
  locale: computed(() => props.locale),
  select,
  setFocusedDate,
  slotPrefix: computed(() => 'range-calendar' as const),
  slots: computed(() => slots.value as never),
  visibleMonths,
})

// Year picker. The parts are optional, so this is provided unconditionally and
// simply goes unused when the caller does not render them.
const calendarRef = ref<HTMLElement | null>(null)
const isYearPickerOpen = ref(false)

/** React defaults the selectable years to 1900-2099, offset per calendar system. */
const yearOffset = computed(() => getGregorianYearOffset(focusedDate.value.calendar.identifier))
const yearPickerMin = computed<DateValue>(
  () => props.minValue ?? new CalendarDate(1900 + yearOffset.value, 1, 1),
)
const yearPickerMax = computed<DateValue>(
  () => props.maxValue ?? new CalendarDate(2099 + yearOffset.value, 12, 31),
)

provide(YEAR_PICKER_CONTEXT_KEY, {
  calendarGridSlot: 'range-calendar-grid',
  calendarRef,
  isOpen: computed(() => isYearPickerOpen.value),
  maxValue: yearPickerMax,
  minValue: yearPickerMin,
  setIsOpen: (open: boolean) => {
    isYearPickerOpen.value = open
  },
})
</script>

<template>
  <div
    ref="calendarRef"
    :class="calendarClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :data-invalid="dataAttr(props.isInvalid)"
    data-slot="range-calendar"
    role="group"
  >
    <slot :focused-date="focusedDate" :value="value" />
  </div>
</template>
