// Compound namespace: mirrors the React dot-notation API (ColorArea.Thumb).
// Requires <script setup>; the options-API `components` option cannot resolve
// dotted tags.
import ColorArea from './ColorArea.vue'
import ColorAreaThumb from './ColorAreaThumb.vue'

type ColorAreaCompound = typeof ColorArea & {
  Root: typeof ColorArea
  Thumb: typeof ColorAreaThumb
}

export const ColorAreaNamespace: ColorAreaCompound = Object.assign(ColorArea, {
  Root: ColorArea,
  Thumb: ColorAreaThumb,
})
