import type { ComputedRef, InjectionKey } from 'vue'
import type { modalVariants } from '@rysinal/heroui-vue-styles'

export type ModalPlacement = 'auto' | 'top' | 'center' | 'bottom'
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full'
export type ModalScroll = 'inside' | 'outside'
export type ModalBackdropVariant = 'transparent' | 'opaque' | 'blur'

export interface ModalContext {
  close: () => void
  open: () => void
  isOpen: ComputedRef<boolean>
  isEntering: ComputedRef<boolean>
  isExiting: ComputedRef<boolean>
  /** Id of the heading labelling the dialog, when one is rendered. */
  headingId: ComputedRef<string | undefined>
  placement: ComputedRef<ModalPlacement>
  registerHeadingId: (id: string) => void
  /** Remembers the element that opened the modal so focus can return to it. */
  setTriggerElement: (element: HTMLElement | null) => void
  /** Element that opened the modal, when the root is tracking it. */
  triggerElement?: ComputedRef<HTMLElement | null>
  setOpen: (value: boolean) => void
  setPlacement: (placement: ModalPlacement) => void
  slots: ComputedRef<ReturnType<typeof modalVariants>>
  unregisterHeadingId: (id: string) => void
}

export const MODAL_CONTEXT_KEY: InjectionKey<ModalContext> = Symbol('ModalContext')
