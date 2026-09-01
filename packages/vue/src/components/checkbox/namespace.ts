// Compound namespace: mirrors the React dot-notation API
// (Checkbox.Control, Checkbox.Indicator, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Checkbox from './Checkbox.vue'
import CheckboxContent from './CheckboxContent.vue'
import CheckboxControl from './CheckboxControl.vue'
import CheckboxIndicator from './CheckboxIndicator.vue'

type CheckboxCompound = typeof Checkbox & {
  Content: typeof CheckboxContent
  Control: typeof CheckboxControl
  Indicator: typeof CheckboxIndicator
  Root: typeof Checkbox
}

export const CheckboxNamespace: CheckboxCompound = Object.assign(Checkbox, {
  Content: CheckboxContent,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Root: Checkbox,
})
