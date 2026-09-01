// Compound namespace: mirrors the React dot-notation API
// (Slider.Track, Slider.Thumb, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Slider from './Slider.vue'
import SliderFill from './SliderFill.vue'
import SliderMarks from './SliderMarks.vue'
import SliderOutput from './SliderOutput.vue'
import SliderThumb from './SliderThumb.vue'
import SliderTrack from './SliderTrack.vue'

type SliderCompound = typeof Slider & {
  Fill: typeof SliderFill
  Marks: typeof SliderMarks
  Output: typeof SliderOutput
  Root: typeof Slider
  Thumb: typeof SliderThumb
  Track: typeof SliderTrack
}

export const SliderNamespace: SliderCompound = Object.assign(Slider, {
  Fill: SliderFill,
  Marks: SliderMarks,
  Output: SliderOutput,
  Root: Slider,
  Thumb: SliderThumb,
  Track: SliderTrack,
})
