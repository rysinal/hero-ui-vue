// Link carries the dot-notation parts (Link.Root, ...)
// while every part stays available as a flat export below.
export { LinkNamespace as Link } from './namespace'
export { default as LinkRoot } from './Link.vue'
export { default as LinkIcon } from './LinkIcon.vue'
export { LINK_CONTEXT_KEY } from './context'
export type { LinkContext } from './context'
