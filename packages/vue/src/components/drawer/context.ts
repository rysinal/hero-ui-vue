import type { ComputedRef, InjectionKey } from 'vue'
import type { drawerVariants } from '@rysinal/heroui-vue-styles'

export type DrawerPlacement = 'bottom' | 'top' | 'left' | 'right'
export type DrawerBackdropVariant = 'transparent' | 'opaque' | 'blur'

export interface DrawerContext {
  close: () => void
  open: () => void
  /** Id of the heading labelling the dialog, when one is rendered. */
  headingId: ComputedRef<string | undefined>
  registerHeadingId: (id: string) => void
  unregisterHeadingId: (id: string) => void
  /** Remembers the element that opened the drawer so focus can return to it. */
  setTriggerElement: (element: HTMLElement | null) => void
  triggerElement?: ComputedRef<HTMLElement | null>
  isDismissable: ComputedRef<boolean>
  isEntering: ComputedRef<boolean>
  isExiting: ComputedRef<boolean>
  isOpen: ComputedRef<boolean>
  placement: ComputedRef<DrawerPlacement>
  setOpen: (value: boolean) => void
  setPlacement: (placement: DrawerPlacement) => void
  slots: ComputedRef<ReturnType<typeof drawerVariants>>
}

export const DRAWER_CONTEXT_KEY: InjectionKey<DrawerContext> = Symbol('DrawerContext')
