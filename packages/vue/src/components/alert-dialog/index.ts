// AlertDialog carries the dot-notation parts (AlertDialog.Root, ...)
// while every part stays available as a flat export below.
export { AlertDialogNamespace as AlertDialog } from './namespace'
export { default as AlertDialogRoot } from './AlertDialog.vue'
export { default as AlertDialogBackdrop } from './AlertDialogBackdrop.vue'
export { default as AlertDialogBody } from './AlertDialogBody.vue'
export { default as AlertDialogCloseTrigger } from './AlertDialogCloseTrigger.vue'
export { default as AlertDialogContainer } from './AlertDialogContainer.vue'
export { default as AlertDialogDialog } from './AlertDialogDialog.vue'
export { default as AlertDialogFooter } from './AlertDialogFooter.vue'
export { default as AlertDialogHeader } from './AlertDialogHeader.vue'
export { default as AlertDialogHeading } from './AlertDialogHeading.vue'
export { default as AlertDialogIcon } from './AlertDialogIcon.vue'
export { default as AlertDialogTrigger } from './AlertDialogTrigger.vue'
export type {
  AlertDialogBackdropVariant,
  AlertDialogPlacement,
  AlertDialogSize,
  AlertDialogStatus,
} from './context'
export type { AlertDialogVariants } from '@rysinal/heroui-vue-styles'
