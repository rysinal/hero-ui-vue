// Select carries the dot-notation parts (Select.Root, ...)
// while every part stays available as a flat export below.
export { SelectNamespace as Select } from './namespace'
export { default as SelectRoot } from './Select.vue'
export { default as SelectIndicator } from './SelectIndicator.vue'
export { default as SelectPopover } from './SelectPopover.vue'
export { default as SelectTrigger } from './SelectTrigger.vue'
export { default as SelectValue } from './SelectValue.vue'
export type { SelectKey, SelectSelectionMode } from './context'
