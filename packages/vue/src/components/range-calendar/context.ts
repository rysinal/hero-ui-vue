import type { ComputedRef, InjectionKey } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { DateRange } from './RangeCalendar.vue'

/**
 * Supplied by a component that owns the selected range and merely borrows a
 * RangeCalendar to present it, which is how DateRangePicker composes one. When
 * this is present the calendar defers to it instead of holding its own value.
 */
export interface RangeSelectionHostValue {
  value: ComputedRef<DateRange | null>
  select: (range: DateRange) => void
  /** Called on the first click, before a range exists. */
  anchor?: (date: DateValue) => void
}

export const RANGE_SELECTION_HOST_KEY: InjectionKey<RangeSelectionHostValue> =
  Symbol('HeroUIRangeSelectionHost')
