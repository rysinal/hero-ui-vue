// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Badge from './Badge.vue'
import BadgeAnchor from './BadgeAnchor.vue'
import BadgeLabel from './BadgeLabel.vue'

type BadgeCompound = typeof Badge & {
  Anchor: typeof BadgeAnchor
  Label: typeof BadgeLabel
  Root: typeof Badge
}

export const BadgeNamespace: BadgeCompound = Object.assign(Badge, {
  Anchor: BadgeAnchor,
  Label: BadgeLabel,
  Root: Badge,
})
