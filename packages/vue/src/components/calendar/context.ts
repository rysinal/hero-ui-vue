import type { ComputedRef, InjectionKey } from 'vue'
import type { CalendarDate, DateValue } from '@internationalized/date'
import type { calendarVariants } from '@rysinal/heroui-vue-styles'

export interface CalendarContextValue {
  slots: ComputedRef<ReturnType<typeof calendarVariants>>
  /**
   * Prefix for every part's `data-slot`. RangeCalendar sets this to
   * "range-calendar" so the shared parts announce themselves the way React's
   * separate range components do, which is what the CSS selectors expect.
   */
  slotPrefix?: ComputedRef<'calendar' | 'range-calendar'>
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

/**
 * Supplied by a component that owns the selected date and merely borrows a
 * Calendar to present it, which is how DatePicker composes one. When this is
 * present the Calendar defers to it instead of holding its own value, mirroring
 * React's DatePickerStateContext.
 */
export interface DateSelectionHostValue {
  value: ComputedRef<DateValue | null>
  select: (date: DateValue) => void
}

export const DATE_SELECTION_HOST_KEY: InjectionKey<DateSelectionHostValue> =
  Symbol('HeroUIDateSelectionHost')

/**
 * Resolves a part's `data-slot`, honouring the prefix its calendar set. Keeps
 * the shared parts in step with React, where the range variants carry their own
 * `range-calendar-*` names and the CSS selects on them.
 */
export function calendarSlotName(
  context: CalendarContextValue | null,
  part: string,
): string {
  const prefix = context?.slotPrefix?.value ?? 'calendar'
  return part ? `${prefix}-${part}` : prefix
}
