// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import InputGroup from './InputGroup.vue'
import InputGroupInput from './InputGroupInput.vue'
import InputGroupPrefix from './InputGroupPrefix.vue'
import InputGroupSuffix from './InputGroupSuffix.vue'
import InputGroupTextArea from './InputGroupTextArea.vue'

type InputGroupCompound = typeof InputGroup & {
  Input: typeof InputGroupInput
  Prefix: typeof InputGroupPrefix
  Root: typeof InputGroup
  Suffix: typeof InputGroupSuffix
  TextArea: typeof InputGroupTextArea
}

export const InputGroupNamespace: InputGroupCompound = Object.assign(InputGroup, {
  Input: InputGroupInput,
  Prefix: InputGroupPrefix,
  Root: InputGroup,
  Suffix: InputGroupSuffix,
  TextArea: InputGroupTextArea,
})
