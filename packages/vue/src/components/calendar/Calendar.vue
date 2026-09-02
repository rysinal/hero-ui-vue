<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, provide, ref, shallowRef } from 'vue'
import {
  CalendarDate,
  getLocalTimeZone,
  isSameDay,
  startOfMonth,
  today,
  type DateValue,
} from '@internationalized/date'
import { calendarVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, getGregorianYearOffset } from '../../utils'
import { YEAR_PICKER_CONTEXT_KEY } from '../calendar-year-picker/context'
import { CALENDAR_CONTEXT_KEY, DATE_SELECTION_HOST_KEY, type DayOfWeek } from './context'

interface CalendarProps {
  class?: string
  /** Selected date. Supports `v-model`. */
  modelValue?: DateValue | null
  defaultValue?: DateValue | null
  /** Month currently in view. Supports `v-model:focused-value`. */
  focusedValue?: DateValue
  defaultFocusedValue?: DateValue
  minValue?: DateValue
  maxValue?: DateValue
  /** Marks individual dates unselectable, e.g. booked days. */
  isDateUnavailable?: (date: DateValue) => boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  /** How many months to show side by side. */
  visibleMonths?: number
  locale?: string
  /** Starts each week on this day instead of the one the locale implies. */
  firstDayOfWeek?: DayOfWeek
  /** Year-picker visibility. Supports `v-model:is-year-picker-open`. */
  isYearPickerOpen?: boolean
  defaultYearPickerOpen?: boolean
}

const props = withDefaults(defineProps<CalendarProps>(), {
  defaultFocusedValue: undefined,
  defaultValue: null,
  defaultYearPickerOpen: false,
  firstDayOfWeek: undefined,
  focusedValue: undefined,
  isDateUnavailable: undefined,
  isDisabled: false,
  isReadOnly: false,
  isYearPickerOpen: undefined,
  locale: 'en-US',
  maxValue: undefined,
  minValue: undefined,
  modelValue: undefined,
  visibleMonths: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: DateValue]
  'update:focusedValue': [value: DateValue]
  'update:isYearPickerOpen': [value: boolean]
  change: [value: DateValue]
  focusChange: [value: DateValue]
  yearPickerOpenChange: [value: boolean]
}>()

const toCalendar = (date: DateValue): CalendarDate =>
  new CalendarDate(date.year, date.month, date.day)

const internalValue = shallowRef<DateValue | null>(props.defaultValue)
// A host such as DatePicker owns the value and merely borrows this calendar to
// present it; without one the calendar keeps its own.
const host = inject(DATE_SELECTION_HOST_KEY, null)
const value = computed(() => {
  if (host) return host.value.value
  return props.modelValue === undefined ? internalValue.value : props.modelValue
})

const initialFocus =
  props.defaultFocusedValue ?? props.defaultValue ?? host?.value.value ?? today(getLocalTimeZone())
const internalFocused = shallowRef<CalendarDate>(toCalendar(initialFocus))
const focusedDate = computed(() =>
  props.focusedValue === undefined ? internalFocused.value : toCalendar(props.focusedValue),
)

const slots = computed(() => calendarVariants())
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
  emit('focusChange', date)
}

const select = (date: CalendarDate) => {
  if (props.isDisabled || props.isReadOnly) return
  if (isDateOutOfRange(date) || isDateUnavailable(date)) return

  if (host) {
    host.select(date)
    setFocusedDate(date)
    return
  }

  if (props.modelValue === undefined) internalValue.value = date
  emit('update:modelValue', date)
  emit('change', date)
  setFocusedDate(date)
}

// A month is reachable only if any of its days falls inside min/max.
const canGoPrevious = computed(() => {
  if (!props.minValue) return true
  const previous = startOfMonth(focusedDate.value).subtract({ months: 1 })
  return previous.add({ months: 1 }).subtract({ days: 1 }).compare(props.minValue) >= 0
})

const canGoNext = computed(() => {
  if (!props.maxValue) return true
  return startOfMonth(focusedDate.value).add({ months: props.visibleMonths }).compare(props.maxValue) <= 0
})

provide(CALENDAR_CONTEXT_KEY, {
  canGoNext,
  canGoPrevious,
  firstDayOfWeek: computed(() => props.firstDayOfWeek),
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
  isReadOnly: computed(() => props.isReadOnly),
  isSelected: (date: DateValue) => (value.value ? isSameDay(date, value.value) : false),
  locale: computed(() => props.locale),
  select,
  setFocusedDate,
  slots,
  visibleMonths,
})

// Year picker. The parts are optional, so this is provided unconditionally and
// simply goes unused when the caller does not render them.
const calendarRef = ref<HTMLElement | null>(null)
const internalYearPickerOpen = ref(props.defaultYearPickerOpen)
const isYearPickerOpen = computed(() =>
  props.isYearPickerOpen === undefined ? internalYearPickerOpen.value : props.isYearPickerOpen,
)

const setYearPickerOpen = (open: boolean) => {
  if (props.isYearPickerOpen === undefined) internalYearPickerOpen.value = open
  emit('update:isYearPickerOpen', open)
  emit('yearPickerOpenChange', open)
}

/** React defaults the selectable years to 1900-2099, offset per calendar system. */
const yearOffset = computed(() => getGregorianYearOffset(focusedDate.value.calendar.identifier))
const yearPickerMin = computed<DateValue>(
  () => props.minValue ?? new CalendarDate(1900 + yearOffset.value, 1, 1),
)
const yearPickerMax = computed<DateValue>(
  () => props.maxValue ?? new CalendarDate(2099 + yearOffset.value, 12, 31),
)

provide(YEAR_PICKER_CONTEXT_KEY, {
  calendarGridSlot: 'calendar-grid',
  calendarRef,
  isOpen: isYearPickerOpen,
  maxValue: yearPickerMax,
  minValue: yearPickerMin,
  setIsOpen: setYearPickerOpen,
})
</script>

<template>
  <div
    ref="calendarRef"
    :class="calendarClass"
    :data-disabled="dataAttr(props.isDisabled)"
    data-slot="calendar"
    role="group"
  >
    <slot :focused-date="focusedDate" :value="value" :visible-months="visibleMonths" />
  </div>
</template>
