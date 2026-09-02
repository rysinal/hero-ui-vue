/* global HTMLElement */
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { dateRangePickerVariants } from '@rysinal/heroui-vue-styles'

export interface DateRangePickerContextValue {
  slots: ComputedRef<ReturnType<typeof dateRangePickerVariants>>
  isOpen: ComputedRef<boolean>
  setOpen: (open: boolean) => void
  /** The trigger focus is restored to after a keyboard-driven close. */
  triggerRef: Ref<HTMLElement | null>
  shouldRestoreFocus: Ref<boolean>
}

export const DATE_RANGE_PICKER_CONTEXT_KEY: InjectionKey<DateRangePickerContextValue> =
  Symbol('HeroUIDateRangePickerContext')
