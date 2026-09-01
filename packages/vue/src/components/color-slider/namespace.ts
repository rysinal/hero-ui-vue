// Compound namespace: mirrors the React dot-notation API
// (ColorSlider.Track, ColorSlider.Thumb, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ColorSlider from './ColorSlider.vue'
import ColorSliderOutput from './ColorSliderOutput.vue'
import ColorSliderThumb from './ColorSliderThumb.vue'
import ColorSliderTrack from './ColorSliderTrack.vue'

type ColorSliderCompound = typeof ColorSlider & {
  Output: typeof ColorSliderOutput
  Root: typeof ColorSlider
  Thumb: typeof ColorSliderThumb
  Track: typeof ColorSliderTrack
}

export const ColorSliderNamespace: ColorSliderCompound = Object.assign(ColorSlider, {
  Output: ColorSliderOutput,
  Root: ColorSlider,
  Thumb: ColorSliderThumb,
  Track: ColorSliderTrack,
})
