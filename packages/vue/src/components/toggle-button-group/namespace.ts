// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ToggleButtonGroup from './ToggleButtonGroup.vue'
import ToggleButtonGroupSeparator from './ToggleButtonGroupSeparator.vue'

type ToggleButtonGroupCompound = typeof ToggleButtonGroup & {
  Root: typeof ToggleButtonGroup
  Separator: typeof ToggleButtonGroupSeparator
}

export const ToggleButtonGroupNamespace: ToggleButtonGroupCompound = Object.assign(ToggleButtonGroup, {
  Root: ToggleButtonGroup,
  Separator: ToggleButtonGroupSeparator,
})
