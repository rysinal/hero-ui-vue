// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Avatar from './Avatar.vue'
import AvatarFallback from './AvatarFallback.vue'
import AvatarImage from './AvatarImage.vue'

type AvatarCompound = typeof Avatar & {
  Fallback: typeof AvatarFallback
  Image: typeof AvatarImage
  Root: typeof Avatar
}

export const AvatarNamespace: AvatarCompound = Object.assign(Avatar, {
  Fallback: AvatarFallback,
  Image: AvatarImage,
  Root: Avatar,
})
