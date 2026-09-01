// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Select from './Select.vue'
import SelectIndicator from './SelectIndicator.vue'
import SelectPopover from './SelectPopover.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'

type SelectCompound = typeof Select & {
  Indicator: typeof SelectIndicator
  Popover: typeof SelectPopover
  Root: typeof Select
  Trigger: typeof SelectTrigger
  Value: typeof SelectValue
}

export const SelectNamespace: SelectCompound = Object.assign(Select, {
  Indicator: SelectIndicator,
  Popover: SelectPopover,
  Root: Select,
  Trigger: SelectTrigger,
  Value: SelectValue,
})
