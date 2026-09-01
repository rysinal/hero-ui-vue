// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import NumberField from './NumberField.vue'
import NumberFieldDecrementButton from './NumberFieldDecrementButton.vue'
import NumberFieldGroup from './NumberFieldGroup.vue'
import NumberFieldIncrementButton from './NumberFieldIncrementButton.vue'
import NumberFieldInput from './NumberFieldInput.vue'

type NumberFieldCompound = typeof NumberField & {
  DecrementButton: typeof NumberFieldDecrementButton
  Group: typeof NumberFieldGroup
  IncrementButton: typeof NumberFieldIncrementButton
  Input: typeof NumberFieldInput
  Root: typeof NumberField
}

export const NumberFieldNamespace: NumberFieldCompound = Object.assign(NumberField, {
  DecrementButton: NumberFieldDecrementButton,
  Group: NumberFieldGroup,
  IncrementButton: NumberFieldIncrementButton,
  Input: NumberFieldInput,
  Root: NumberField,
})
