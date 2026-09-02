import type { ComputedRef, InjectionKey } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { DateSegment, DateSegmentType } from '../date-input-group/context'

export interface DateFieldContextValue {
  value: ComputedRef<DateValue | null>
  segments: ComputedRef<DateSegment[]>
  isDisabled: ComputedRef<boolean>
  isInvalid: ComputedRef<boolean>
  isReadOnly: ComputedRef<boolean>
  isRequired: ComputedRef<boolean>
  setSegment: (type: DateSegmentType, value: number) => void
  adjustSegment: (type: DateSegmentType, delta: number) => void
}

export const DATE_FIELD_CONTEXT_KEY: InjectionKey<DateFieldContextValue> =
  Symbol('HeroUIDateFieldContext')
