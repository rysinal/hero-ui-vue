// Compound namespace: mirrors the React dot-notation API
// (ColorInputGroup.Input, ...). Requires <script setup>; the options-API
// `components` option cannot resolve dotted tags.
import ColorInputGroup from './ColorInputGroup.vue'
import ColorInputGroupInput from './ColorInputGroupInput.vue'
import ColorInputGroupPrefix from './ColorInputGroupPrefix.vue'
import ColorInputGroupSuffix from './ColorInputGroupSuffix.vue'

type ColorInputGroupCompound = typeof ColorInputGroup & {
  Input: typeof ColorInputGroupInput
  Prefix: typeof ColorInputGroupPrefix
  Root: typeof ColorInputGroup
  Suffix: typeof ColorInputGroupSuffix
}

export const ColorInputGroupNamespace: ColorInputGroupCompound = Object.assign(ColorInputGroup, {
  Input: ColorInputGroupInput,
  Prefix: ColorInputGroupPrefix,
  Root: ColorInputGroup,
  Suffix: ColorInputGroupSuffix,
})
