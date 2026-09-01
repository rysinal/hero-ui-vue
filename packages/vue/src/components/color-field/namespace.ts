// Compound namespace: mirrors the React dot-notation API. React points
// ColorField.Group/Input/Prefix/Suffix at ColorInputGroup's parts, so this
// does the same rather than duplicating them.
import {
  ColorInputGroupInput,
  ColorInputGroupPrefix,
  ColorInputGroupRoot,
  ColorInputGroupSuffix,
} from '../color-input-group'
import ColorField from './ColorField.vue'

type ColorFieldCompound = typeof ColorField & {
  Group: typeof ColorInputGroupRoot
  Input: typeof ColorInputGroupInput
  Prefix: typeof ColorInputGroupPrefix
  Root: typeof ColorField
  Suffix: typeof ColorInputGroupSuffix
}

export const ColorFieldNamespace: ColorFieldCompound = Object.assign(ColorField, {
  Group: ColorInputGroupRoot,
  Input: ColorInputGroupInput,
  Prefix: ColorInputGroupPrefix,
  Root: ColorField,
  Suffix: ColorInputGroupSuffix,
})
