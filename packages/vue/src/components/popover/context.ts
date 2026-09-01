import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { popoverVariants } from '@rysinal/heroui-vue-styles'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'
export type PopoverAlign = 'start' | 'center' | 'end'

export interface PopoverContext {
  close: () => void
  isOpen: ComputedRef<boolean>
  open: () => void
  setOpen: (value: boolean) => void
  slots: ComputedRef<ReturnType<typeof popoverVariants>>
}

export interface PopoverContentContext {
  arrowHeight: Ref<number>
  arrowWidth: Ref<number>
  setArrowSize: (size: { height: number; width: number } | null) => void
}

export const POPOVER_CONTEXT_KEY: InjectionKey<PopoverContext> = Symbol('PopoverContext')
export const POPOVER_CONTENT_CONTEXT_KEY: InjectionKey<PopoverContentContext> = Symbol(
  'PopoverContentContext',
)
