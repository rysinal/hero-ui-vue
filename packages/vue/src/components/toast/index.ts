// Toast carries the dot-notation parts (Toast.Title, ...)
// while every part stays available as a flat export below.
export { ToastNamespace as Toast } from './namespace'
export { default as ToastRoot } from './Toast.vue'
export { default as ToastActionButton } from './ToastActionButton.vue'
export { default as ToastCloseButton } from './ToastCloseButton.vue'
export { default as ToastContent } from './ToastContent.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as ToastIndicator } from './ToastIndicator.vue'
export { default as ToastProvider } from './ToastProvider.vue'
export { default as ToastTitle } from './ToastTitle.vue'

export { ToastQueue, createToast, globalToastQueue, toast } from './queue'
export type {
  QueuedToast,
  ToastContentValue,
  ToastFunction,
  ToastOptions,
  ToastPromiseOptions,
  ToastQueueOptions,
  ToastVariant,
} from './queue'
export type { ToastPlacement } from './context'
