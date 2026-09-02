import type { ComputedRef, InjectionKey } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { dateInputGroupVariants } from '@rysinal/heroui-vue-styles'

export type DateSegmentType = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'dayPeriod' | 'literal'

export interface DateSegment {
  type: DateSegmentType
  /** Text to show; the placeholder when the part is not filled in. */
  text: string
  value?: number
  minValue?: number
  maxValue?: number
  isPlaceholder: boolean
  isEditable: boolean
}

export interface DateInputGroupContextValue {
  slots: ComputedRef<ReturnType<typeof dateInputGroupVariants>>
  segments: ComputedRef<DateSegment[]>
  value: ComputedRef<DateValue | null>
  isDisabled: ComputedRef<boolean>
  isInvalid: ComputedRef<boolean>
  isReadOnly: ComputedRef<boolean>
  /** Applies a typed or stepped value to one segment. */
  setSegment: (type: DateSegmentType, value: number) => void
  adjustSegment: (type: DateSegmentType, delta: number) => void
}

export const DATE_INPUT_GROUP_KEY: InjectionKey<DateInputGroupContextValue> =
  Symbol('HeroUIDateInputGroup')
