// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import SearchField from './SearchField.vue'
import SearchFieldClearButton from './SearchFieldClearButton.vue'
import SearchFieldGroup from './SearchFieldGroup.vue'
import SearchFieldInput from './SearchFieldInput.vue'
import SearchFieldSearchIcon from './SearchFieldSearchIcon.vue'

type SearchFieldCompound = typeof SearchField & {
  ClearButton: typeof SearchFieldClearButton
  Group: typeof SearchFieldGroup
  Input: typeof SearchFieldInput
  Root: typeof SearchField
  SearchIcon: typeof SearchFieldSearchIcon
}

export const SearchFieldNamespace: SearchFieldCompound = Object.assign(SearchField, {
  ClearButton: SearchFieldClearButton,
  Group: SearchFieldGroup,
  Input: SearchFieldInput,
  Root: SearchField,
  SearchIcon: SearchFieldSearchIcon,
})
