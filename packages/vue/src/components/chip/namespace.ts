// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Chip from './Chip.vue'
import ChipLabel from './ChipLabel.vue'

type ChipCompound = typeof Chip & {
  Label: typeof ChipLabel
  Root: typeof Chip
}

export const ChipNamespace: ChipCompound = Object.assign(Chip, {
  Label: ChipLabel,
  Root: Chip,
})
