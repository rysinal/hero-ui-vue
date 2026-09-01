// Compound namespace: mirrors the React dot-notation API
// (ProgressCircle.Track, ProgressCircle.FillCircle, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ProgressCircle from './ProgressCircle.vue'
import ProgressCircleFillCircle from './ProgressCircleFillCircle.vue'
import ProgressCircleTrack from './ProgressCircleTrack.vue'
import ProgressCircleTrackCircle from './ProgressCircleTrackCircle.vue'

type ProgressCircleCompound = typeof ProgressCircle & {
  FillCircle: typeof ProgressCircleFillCircle
  Track: typeof ProgressCircleTrack
  TrackCircle: typeof ProgressCircleTrackCircle
  Root: typeof ProgressCircle
}

export const ProgressCircleNamespace: ProgressCircleCompound = Object.assign(ProgressCircle, {
  FillCircle: ProgressCircleFillCircle,
  Track: ProgressCircleTrack,
  TrackCircle: ProgressCircleTrackCircle,
  Root: ProgressCircle,
})
