// DateInputGroup carries the dot-notation parts (DateInputGroup.Segment, ...)
// while every part stays available as a flat export below.
export { DateInputGroupNamespace as DateInputGroup } from './namespace'
export { default as DateInputGroupRoot } from './DateInputGroup.vue'
export { default as DateInputGroupInput } from './DateInputGroupInput.vue'
export { default as DateInputGroupInputContainer } from './DateInputGroupInputContainer.vue'
export { default as DateInputGroupPrefix } from './DateInputGroupPrefix.vue'
export { default as DateInputGroupSegment } from './DateInputGroupSegment.vue'
export { default as DateInputGroupSuffix } from './DateInputGroupSuffix.vue'
export { buildSegments, buildTimeSegments } from './segments'
export type { DateGranularity, TimeGranularity, TimeValue } from './segments'
export type { DateSegment, DateSegmentType } from './context'
