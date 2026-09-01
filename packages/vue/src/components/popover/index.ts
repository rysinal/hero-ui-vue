// Popover carries the dot-notation parts (Popover.Root, ...)
// while every part stays available as a flat export below.
export { PopoverNamespace as Popover } from './namespace'
export { default as PopoverRoot } from './Popover.vue'
export { default as PopoverArrow } from './PopoverArrow.vue'
export { default as PopoverContent } from './PopoverContent.vue'
export { default as PopoverDialog } from './PopoverDialog.vue'
export { default as PopoverHeading } from './PopoverHeading.vue'
export { default as PopoverTrigger } from './PopoverTrigger.vue'
export * from './context'
export type { PopoverVariants } from '@rysinal/heroui-vue-styles'
