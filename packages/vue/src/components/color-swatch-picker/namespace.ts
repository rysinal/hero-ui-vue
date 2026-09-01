// Compound namespace: mirrors the React dot-notation API
// (ColorSwatchPicker.Item, ...). Requires <script setup>; the options-API
// `components` option cannot resolve dotted tags.
import ColorSwatchPicker from './ColorSwatchPicker.vue'
import ColorSwatchPickerIndicator from './ColorSwatchPickerIndicator.vue'
import ColorSwatchPickerItem from './ColorSwatchPickerItem.vue'
import ColorSwatchPickerSwatch from './ColorSwatchPickerSwatch.vue'

type ColorSwatchPickerCompound = typeof ColorSwatchPicker & {
  Indicator: typeof ColorSwatchPickerIndicator
  Item: typeof ColorSwatchPickerItem
  Root: typeof ColorSwatchPicker
  Swatch: typeof ColorSwatchPickerSwatch
}

export const ColorSwatchPickerNamespace: ColorSwatchPickerCompound = Object.assign(
  ColorSwatchPicker,
  {
    Indicator: ColorSwatchPickerIndicator,
    Item: ColorSwatchPickerItem,
    Root: ColorSwatchPicker,
    Swatch: ColorSwatchPickerSwatch,
  },
)
