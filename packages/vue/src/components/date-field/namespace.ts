// Compound namespace: mirrors the React dot-notation API. React points
// DateField's parts at DateInputGroup, so this does the same.
import {
  DateInputGroupInput,
  DateInputGroupInputContainer,
  DateInputGroupPrefix,
  DateInputGroupRoot,
  DateInputGroupSegment,
  DateInputGroupSuffix,
} from '../date-input-group'
import DateField from './DateField.vue'

type DateFieldCompound = typeof DateField & {
  Group: typeof DateInputGroupRoot
  Input: typeof DateInputGroupInput
  InputContainer: typeof DateInputGroupInputContainer
  Prefix: typeof DateInputGroupPrefix
  Root: typeof DateField
  Segment: typeof DateInputGroupSegment
  Suffix: typeof DateInputGroupSuffix
}

export const DateFieldNamespace: DateFieldCompound = Object.assign(DateField, {
  Group: DateInputGroupRoot,
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Prefix: DateInputGroupPrefix,
  Root: DateField,
  Segment: DateInputGroupSegment,
  Suffix: DateInputGroupSuffix,
})
