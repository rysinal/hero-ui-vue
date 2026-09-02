<script setup lang="ts">
/* global HTMLElement, KeyboardEvent, window, requestAnimationFrame */
import { computed, onBeforeUnmount, provide, ref, shallowRef, watch } from 'vue'
import type { DateValue } from '@internationalized/date'
import { datePickerVariants } from '@rysinal/heroui-vue-styles'
import { PopoverRoot } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { DATE_FIELD_CONTEXT_KEY } from '../date-field/context'
import { DATE_SELECTION_HOST_KEY } from '../calendar/context'
import { buildSegments, type DateGranularity } from '../date-input-group/segments'
import type { DateSegmentType } from '../date-input-group/context'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { DATE_PICKER_CONTEXT_KEY } from './context'

interface DatePickerProps {
  class?: string
  /** Selected date. Supports `v-model`. */
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
  /** Popover open state. Supports `v-model:is-open`. */
  isOpen?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  defaultOpen: false,
  defaultValue: null,
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
})

const emit = defineEmits<{
  'update:modelValue': [value: DateValue | null]
  'update:isOpen': [value: boolean]
  change: [value: DateValue | null]
  openChange: [value: boolean]
}>()

const slots = computed(() => datePickerVariants())
const pickerClass = computed(() => composeTwClasses(props.class, slots.value.base()))

// shallowRef: DateValue is a class instance, and a deep ref would hand out a
// new proxy on every access.
const internalValue = shallowRef<DateValue | null>(props.defaultValue)
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

  // A keyboard-driven close puts focus back on the trigger, as React does.
  if (!next && shouldRestoreFocus.value) {
    requestAnimationFrame(() => triggerRef.value?.focus())
  }
  shouldRestoreFocus.value = false
}

/** Any bare keypress while open means the user is driving from the keyboard. */
const markKeyboardIntent = (event: KeyboardEvent) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return
  shouldRestoreFocus.value = true
}

watch(isOpen, (open) => {
  if (open) window.addEventListener('keydown', markKeyboardIntent, true)
  else window.removeEventListener('keydown', markKeyboardIntent, true)
})

onBeforeUnmount(() => window.removeEventListener('keydown', markKeyboardIntent, true))

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

const setSegment = (type: DateSegmentType, next: number) => {
  applySegment(type, (current) => {
    const base = new CalendarDate(current.year, current.month, current.day)
    if (type === 'year') return base.set({ year: next })
    if (type === 'month') return base.set({ month: next })
    if (type === 'day') return base.set({ day: next })
    return base
  })
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

/** Picking a day in the calendar fills the field and dismisses the popover. */
const selectFromCalendar = (next: DateValue) => {
  commit(next)
  setOpen(false)
}

// The field parts read from this, so DateField.Group works unchanged inside.
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

provide(DATE_PICKER_CONTEXT_KEY, {
  isOpen,
  setOpen,
  shouldRestoreFocus,
  slots,
  triggerRef,
})

// A Calendar rendered in the popover defers to this instead of holding its own
// value, which is how React's DatePicker drives the calendar it wraps.
provide(DATE_SELECTION_HOST_KEY, {
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
      data-slot="date-picker"
    >
      <slot :is-open="isOpen" :segments="segments" :select="selectFromCalendar" :value="value" />
      <input v-if="props.name" :name="props.name" :value="value?.toString() ?? ''" type="hidden" />
    </div>
  </PopoverRoot>
</template>
