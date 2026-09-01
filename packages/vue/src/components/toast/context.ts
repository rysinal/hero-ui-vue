import type { ComputedRef, InjectionKey } from 'vue'
import type { toastVariants } from '@rysinal/heroui-vue-styles'
import type { QueuedToast, ToastQueue } from './queue'

export type ToastPlacement =
  | 'top'
  | 'top start'
  | 'top end'
  | 'bottom'
  | 'bottom start'
  | 'bottom end'

export interface ToastProviderContextValue {
  slots: ComputedRef<ReturnType<typeof toastVariants>>
  queue: ToastQueue
  placement: ComputedRef<ToastPlacement>
}

export interface ToastItemContextValue {
  slots: ComputedRef<ReturnType<typeof toastVariants>>
  toast: ComputedRef<QueuedToast>
  close: () => void
}

export const TOAST_PROVIDER_KEY: InjectionKey<ToastProviderContextValue> =
  Symbol('HeroUIToastProvider')

export const TOAST_ITEM_KEY: InjectionKey<ToastItemContextValue> = Symbol('HeroUIToastItem')
