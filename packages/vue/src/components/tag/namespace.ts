// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Tag from './Tag.vue'
import TagRemoveButton from './TagRemoveButton.vue'

type TagCompound = typeof Tag & {
  RemoveButton: typeof TagRemoveButton
  Root: typeof Tag
}

export const TagNamespace: TagCompound = Object.assign(Tag, {
  RemoveButton: TagRemoveButton,
  Root: Tag,
})
