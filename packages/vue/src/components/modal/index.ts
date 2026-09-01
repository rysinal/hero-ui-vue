// Modal carries the dot-notation parts (Modal.Root, ...)
// while every part stays available as a flat export below.
export { ModalNamespace as Modal } from './namespace'
export { default as ModalRoot } from './Modal.vue'
export { default as ModalBackdrop } from './ModalBackdrop.vue'
export { default as ModalBody } from './ModalBody.vue'
export { default as ModalCloseTrigger } from './ModalCloseTrigger.vue'
export { default as ModalContainer } from './ModalContainer.vue'
export { default as ModalDialog } from './ModalDialog.vue'
export { default as ModalFooter } from './ModalFooter.vue'
export { default as ModalHeader } from './ModalHeader.vue'
export { default as ModalHeading } from './ModalHeading.vue'
export { default as ModalIcon } from './ModalIcon.vue'
export { default as ModalTrigger } from './ModalTrigger.vue'
export type {
  ModalBackdropVariant,
  ModalPlacement,
  ModalScroll,
  ModalSize,
} from './context'
export type { ModalVariants } from '@rysinal/heroui-vue-styles'
