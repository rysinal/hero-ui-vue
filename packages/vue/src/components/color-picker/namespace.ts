// Compound namespace: mirrors the React dot-notation API
// (ColorPicker.Trigger, ColorPicker.Popover). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ColorPicker from './ColorPicker.vue'
import ColorPickerPopover from './ColorPickerPopover.vue'
import ColorPickerTrigger from './ColorPickerTrigger.vue'

type ColorPickerCompound = typeof ColorPicker & {
  Popover: typeof ColorPickerPopover
  Root: typeof ColorPicker
  Trigger: typeof ColorPickerTrigger
}

export const ColorPickerNamespace: ColorPickerCompound = Object.assign(ColorPicker, {
  Popover: ColorPickerPopover,
  Root: ColorPicker,
  Trigger: ColorPickerTrigger,
})
