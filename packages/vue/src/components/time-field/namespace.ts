// Compound namespace: mirrors the React dot-notation API. React points
// TimeField's parts at DateInputGroup, so this does the same.
import {
  DateInputGroupInput,
  DateInputGroupInputContainer,
  DateInputGroupPrefix,
  DateInputGroupRoot,
  DateInputGroupSegment,
  DateInputGroupSuffix,
} from '../date-input-group'
import TimeField from './TimeField.vue'

type TimeFieldCompound = typeof TimeField & {
  Group: typeof DateInputGroupRoot
  Input: typeof DateInputGroupInput
  InputContainer: typeof DateInputGroupInputContainer
  Prefix: typeof DateInputGroupPrefix
  Root: typeof TimeField
  Segment: typeof DateInputGroupSegment
  Suffix: typeof DateInputGroupSuffix
}

export const TimeFieldNamespace: TimeFieldCompound = Object.assign(TimeField, {
  Group: DateInputGroupRoot,
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Prefix: DateInputGroupPrefix,
  Root: TimeField,
  Segment: DateInputGroupSegment,
  Suffix: DateInputGroupSuffix,
})
