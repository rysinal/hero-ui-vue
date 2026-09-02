/* global HTMLElement */
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { datePickerVariants } from '@rysinal/heroui-vue-styles'

export interface DatePickerContextValue {
  slots: ComputedRef<ReturnType<typeof datePickerVariants>>
  isOpen: ComputedRef<boolean>
  setOpen: (open: boolean) => void
  /** The trigger focus is restored to after a keyboard-driven close. */
  triggerRef: Ref<HTMLElement | null>
  /** Set when a key was pressed while open, so focus returns to the trigger. */
  shouldRestoreFocus: Ref<boolean>
}

export const DATE_PICKER_CONTEXT_KEY: InjectionKey<DatePickerContextValue> =
  Symbol('HeroUIDatePickerContext')
