// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ButtonGroup from './ButtonGroup.vue'
import ButtonGroupSeparator from './ButtonGroupSeparator.vue'

type ButtonGroupCompound = typeof ButtonGroup & {
  Root: typeof ButtonGroup
  Separator: typeof ButtonGroupSeparator
}

export const ButtonGroupNamespace: ButtonGroupCompound = Object.assign(ButtonGroup, {
  Root: ButtonGroup,
  Separator: ButtonGroupSeparator,
})
