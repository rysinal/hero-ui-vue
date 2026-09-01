// Kbd carries the dot-notation parts (Kbd.Abbr, ...)
// while every part stays available as a flat export below.
export { KbdNamespace as Kbd } from './namespace'
export { default as KbdRoot } from './Kbd.vue'
export { default as KbdAbbr } from './KbdAbbr.vue'
export { default as KbdContent } from './KbdContent.vue'
export { kbdKeysLabelMap, kbdKeysMap } from './constants'
export type { KbdKey } from './constants'
