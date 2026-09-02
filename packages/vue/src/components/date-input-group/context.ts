import type { ComputedRef, InjectionKey } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { dateInputGroupVariants } from '@rysinal/heroui-vue-styles'
import type { TimeValue } from './segments'

export type DateSegmentType = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'dayPeriod' | 'literal'

/** Which end of a range a segment edits; absent for a single value. */
export type DateRangeEnd = 'start' | 'end'

export interface DateSegment {
  type: DateSegmentType
  /** Text to show; the placeholder when the part is not filled in. */
  text: string
  value?: number
  minValue?: number
  maxValue?: number
  isPlaceholder: boolean
  isEditable: boolean
  /** Set when the segment belongs to one end of a range. */
  end?: DateRangeEnd
}

export interface DateInputGroupContextValue {
  slots: ComputedRef<ReturnType<typeof dateInputGroupVariants>>
  segments: ComputedRef<DateSegment[]>
  /** A DateField supplies a date, a TimeField a time; the parts are shared. */
  value: ComputedRef<DateValue | TimeValue | null>
  isDisabled: ComputedRef<boolean>
  isInvalid: ComputedRef<boolean>
  isReadOnly: ComputedRef<boolean>
  /** Applies a typed or stepped value to one segment. */
  setSegment: (type: DateSegmentType, value: number, end?: DateRangeEnd) => void
  adjustSegment: (type: DateSegmentType, delta: number, end?: DateRangeEnd) => void
  /** Supplied by a range host, so each input renders only its own parts. */
  segmentsFor?: (end: DateRangeEnd) => DateSegment[]
}

export const DATE_INPUT_GROUP_KEY: InjectionKey<DateInputGroupContextValue> =
  Symbol('HeroUIDateInputGroup')
