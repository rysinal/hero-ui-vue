// Compound namespace: mirrors the React dot-notation API (TagGroup.List).
// Requires <script setup>; the options-API `components` option cannot
// resolve dotted tags.
import TagGroup from './TagGroup.vue'
import TagGroupList from './TagGroupList.vue'

type TagGroupCompound = typeof TagGroup & {
  List: typeof TagGroupList
  Root: typeof TagGroup
}

export const TagGroupNamespace: TagGroupCompound = Object.assign(TagGroup, {
  List: TagGroupList,
  Root: TagGroup,
})
