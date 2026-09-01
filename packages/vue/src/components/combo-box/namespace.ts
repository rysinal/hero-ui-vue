// Compound namespace: mirrors the React dot-notation API
// (ComboBox.InputGroup, ComboBox.Popover, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ComboBox from './ComboBox.vue'
import ComboBoxInputGroup from './ComboBoxInputGroup.vue'
import ComboBoxPopover from './ComboBoxPopover.vue'
import ComboBoxTrigger from './ComboBoxTrigger.vue'

type ComboBoxCompound = typeof ComboBox & {
  InputGroup: typeof ComboBoxInputGroup
  Popover: typeof ComboBoxPopover
  Root: typeof ComboBox
  Trigger: typeof ComboBoxTrigger
}

export const ComboBoxNamespace: ComboBoxCompound = Object.assign(ComboBox, {
  InputGroup: ComboBoxInputGroup,
  Popover: ComboBoxPopover,
  Root: ComboBox,
  Trigger: ComboBoxTrigger,
})
