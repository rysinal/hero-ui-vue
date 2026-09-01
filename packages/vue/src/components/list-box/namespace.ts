// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ListBox from './ListBox.vue'
import ListBoxItem from './ListBoxItem.vue'
import ListBoxItemIndicator from './ListBoxItemIndicator.vue'
import ListBoxSection from './ListBoxSection.vue'

type ListBoxCompound = typeof ListBox & {
  Item: typeof ListBoxItem
  ItemIndicator: typeof ListBoxItemIndicator
  Root: typeof ListBox
  Section: typeof ListBoxSection
}

export const ListBoxNamespace: ListBoxCompound = Object.assign(ListBox, {
  Item: ListBoxItem,
  ItemIndicator: ListBoxItemIndicator,
  Root: ListBox,
  Section: ListBoxSection,
})
