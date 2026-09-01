// Compound namespace: mirrors the React dot-notation API
// (Kbd.Abbr, Kbd.Content). Requires <script setup>; the options-API
// `components` option cannot resolve dotted tags.
import Kbd from './Kbd.vue'
import KbdAbbr from './KbdAbbr.vue'
import KbdContent from './KbdContent.vue'

type KbdCompound = typeof Kbd & {
  Abbr: typeof KbdAbbr
  Content: typeof KbdContent
  Root: typeof Kbd
}

export const KbdNamespace: KbdCompound = Object.assign(Kbd, {
  Abbr: KbdAbbr,
  Content: KbdContent,
  Root: Kbd,
})
