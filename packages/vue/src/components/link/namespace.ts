// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Link from './Link.vue'
import LinkIcon from './LinkIcon.vue'

type LinkCompound = typeof Link & {
  Icon: typeof LinkIcon
  Root: typeof Link
}

export const LinkNamespace: LinkCompound = Object.assign(Link, {
  Icon: LinkIcon,
  Root: Link,
})
