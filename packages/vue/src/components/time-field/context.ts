import type { ComputedRef, InjectionKey } from 'vue'
import type { DateSegment, DateSegmentType } from '../date-input-group/context'
import type { TimeValue } from '../date-input-group/segments'

export interface TimeFieldContextValue {
  value: ComputedRef<TimeValue | null>
  segments: ComputedRef<DateSegment[]>
  isDisabled: ComputedRef<boolean>
  isInvalid: ComputedRef<boolean>
  isReadOnly: ComputedRef<boolean>
  isRequired: ComputedRef<boolean>
  setSegment: (type: DateSegmentType, value: number) => void
  adjustSegment: (type: DateSegmentType, delta: number) => void
}

export const TIME_FIELD_CONTEXT_KEY: InjectionKey<TimeFieldContextValue> =
  Symbol('HeroUITimeFieldContext')
