// Compound namespace: mirrors the React dot-notation API
// (DateInputGroup.Segment, ...). Requires <script setup>; the options-API
// `components` option cannot resolve dotted tags.
import DateInputGroup from './DateInputGroup.vue'
import DateInputGroupInput from './DateInputGroupInput.vue'
import DateInputGroupInputContainer from './DateInputGroupInputContainer.vue'
import DateInputGroupPrefix from './DateInputGroupPrefix.vue'
import DateInputGroupSegment from './DateInputGroupSegment.vue'
import DateInputGroupSuffix from './DateInputGroupSuffix.vue'

type DateInputGroupCompound = typeof DateInputGroup & {
  Input: typeof DateInputGroupInput
  InputContainer: typeof DateInputGroupInputContainer
  Prefix: typeof DateInputGroupPrefix
  Root: typeof DateInputGroup
  Segment: typeof DateInputGroupSegment
  Suffix: typeof DateInputGroupSuffix
}

export const DateInputGroupNamespace: DateInputGroupCompound = Object.assign(DateInputGroup, {
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Prefix: DateInputGroupPrefix,
  Root: DateInputGroup,
  Segment: DateInputGroupSegment,
  Suffix: DateInputGroupSuffix,
})
