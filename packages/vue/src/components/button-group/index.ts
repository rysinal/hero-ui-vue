// ButtonGroup carries the dot-notation parts (ButtonGroup.Root, ...)
// while every part stays available as a flat export below.
export { ButtonGroupNamespace as ButtonGroup } from './namespace'
export { default as ButtonGroupRoot } from './ButtonGroup.vue'
export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue'
export { BUTTON_GROUP_CONTEXT_KEY } from './context'
export type { ButtonGroupContext } from './context'
