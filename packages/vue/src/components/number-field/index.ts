// NumberField carries the dot-notation parts (NumberField.Root, ...)
// while every part stays available as a flat export below.
export { NumberFieldNamespace as NumberField } from './namespace'
export { default as NumberFieldRoot } from './NumberField.vue'
export { default as NumberFieldGroup } from './NumberFieldGroup.vue'
export { default as NumberFieldInput } from './NumberFieldInput.vue'
export { default as NumberFieldIncrementButton } from './NumberFieldIncrementButton.vue'
export { default as NumberFieldDecrementButton } from './NumberFieldDecrementButton.vue'
export type { NumberFieldVariants } from '@rysinal/heroui-vue-styles'
