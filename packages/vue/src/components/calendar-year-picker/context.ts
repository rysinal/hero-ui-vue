/* global HTMLElement */
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { calendarYearPickerVariants } from '@rysinal/heroui-vue-styles'

/**
 * Provided by Calendar / RangeCalendar so the year-picker parts can toggle
 * visibility without the caller wiring anything up. Mirrors React's
 * YearPickerContext.
 */
export interface YearPickerContextValue {
  isOpen: ComputedRef<boolean>
  setIsOpen: (open: boolean) => void
  /** Which grid the year grid overlays; differs between the two calendars. */
  calendarGridSlot: 'calendar-grid' | 'range-calendar-grid'
  /** Root element, used to measure the day grid the year grid covers. */
  calendarRef: Ref<HTMLElement | null>
  minValue: ComputedRef<DateValue>
  maxValue: ComputedRef<DateValue>
}

export const YEAR_PICKER_CONTEXT_KEY: InjectionKey<YearPickerContextValue> =
  Symbol('HeroUIYearPickerContext')

/** Shared by YearPickerGrid with its cells. */
export interface YearPickerGridContextValue {
  years: ComputedRef<number[]>
  activeYear: Ref<number>
  setActiveYear: (year: number) => void
  focusedYear: ComputedRef<number>
  formatYear: (year: number) => string
  selectYear: (year: number) => void
  isOpen: ComputedRef<boolean>
}

export const YEAR_PICKER_GRID_CONTEXT_KEY: InjectionKey<YearPickerGridContextValue> =
  Symbol('HeroUIYearPickerGridContext')

/** Shared by the trigger with its heading and indicator. */
export interface YearPickerTriggerContextValue {
  isOpen: ComputedRef<boolean>
  monthYear: ComputedRef<string>
  slots: ComputedRef<ReturnType<typeof calendarYearPickerVariants>>
  toggle: () => void
}

export const YEAR_PICKER_TRIGGER_CONTEXT_KEY: InjectionKey<YearPickerTriggerContextValue> =
  Symbol('HeroUIYearPickerTriggerContext')
