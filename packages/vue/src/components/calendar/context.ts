import type { ComputedRef, InjectionKey } from 'vue'
import type { CalendarDate, DateValue } from '@internationalized/date'
import type { calendarVariants } from '@rysinal/heroui-vue-styles'

export interface CalendarContextValue {
  slots: ComputedRef<ReturnType<typeof calendarVariants>>
  /** First day of each visible month. */
  visibleMonths: ComputedRef<CalendarDate[]>
  focusedDate: ComputedRef<CalendarDate>
  setFocusedDate: (date: CalendarDate) => void
  isSelected: (date: DateValue) => boolean
  isDisabled: ComputedRef<boolean>
  isReadOnly: ComputedRef<boolean>
  isDateUnavailable: (date: DateValue) => boolean
  isDateOutOfRange: (date: DateValue) => boolean
  select: (date: CalendarDate) => void
  goToPreviousMonth: () => void
  goToNextMonth: () => void
  canGoPrevious: ComputedRef<boolean>
  canGoNext: ComputedRef<boolean>
  locale: ComputedRef<string>
  /** Range highlighting, set by RangeCalendar. */
  isInRange?: (date: DateValue) => boolean
  isRangeStart?: (date: DateValue) => boolean
  isRangeEnd?: (date: DateValue) => boolean
}

export interface CalendarGridContextValue {
  /** Which of the visible months this grid renders. */
  month: ComputedRef<CalendarDate>
}

export const CALENDAR_CONTEXT_KEY: InjectionKey<CalendarContextValue> =
  Symbol('HeroUICalendarContext')

export const CALENDAR_GRID_CONTEXT_KEY: InjectionKey<CalendarGridContextValue> =
  Symbol('HeroUICalendarGridContext')
