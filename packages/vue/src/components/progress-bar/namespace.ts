// Compound namespace: mirrors the React dot-notation API
// (ProgressBar.Track, ProgressBar.Fill, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import ProgressBar from './ProgressBar.vue'
import ProgressBarFill from './ProgressBarFill.vue'
import ProgressBarOutput from './ProgressBarOutput.vue'
import ProgressBarTrack from './ProgressBarTrack.vue'

type ProgressBarCompound = typeof ProgressBar & {
  Fill: typeof ProgressBarFill
  Output: typeof ProgressBarOutput
  Track: typeof ProgressBarTrack
  Root: typeof ProgressBar
}

export const ProgressBarNamespace: ProgressBarCompound = Object.assign(ProgressBar, {
  Fill: ProgressBarFill,
  Output: ProgressBarOutput,
  Track: ProgressBarTrack,
  Root: ProgressBar,
})
