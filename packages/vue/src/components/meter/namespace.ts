// Compound namespace: mirrors the React dot-notation API
// (Meter.Track, Meter.Fill, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Meter from './Meter.vue'
import MeterFill from './MeterFill.vue'
import MeterOutput from './MeterOutput.vue'
import MeterTrack from './MeterTrack.vue'

type MeterCompound = typeof Meter & {
  Fill: typeof MeterFill
  Output: typeof MeterOutput
  Track: typeof MeterTrack
  Root: typeof Meter
}

export const MeterNamespace: MeterCompound = Object.assign(Meter, {
  Fill: MeterFill,
  Output: MeterOutput,
  Track: MeterTrack,
  Root: Meter,
})
