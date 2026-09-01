// Tooltip carries the dot-notation parts (Tooltip.Trigger, ...)
// while every part stays available as a flat export below.
export { TooltipNamespace as Tooltip } from './namespace'
export { default as TooltipRoot } from './Tooltip.vue'
export { default as TooltipArrow } from './TooltipArrow.vue'
export { default as TooltipContent } from './TooltipContent.vue'
export { default as TooltipTrigger } from './TooltipTrigger.vue'
export type { TooltipPlacement } from './context'
