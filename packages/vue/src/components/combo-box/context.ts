import type { ComputedRef, InjectionKey } from 'vue'
import type { comboBoxVariants } from '@rysinal/heroui-vue-styles'

export type ComboBoxKey = string | number

export interface ComboBoxContextValue {
  slots: ComputedRef<ReturnType<typeof comboBoxVariants>>
  isOpen: ComputedRef<boolean>
  setOpen: (open: boolean) => void
  inputValue: ComputedRef<string>
  setInputValue: (value: string) => void
  isDisabled: ComputedRef<boolean | undefined>
  isRequired: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  placeholder: ComputedRef<string | undefined>
}

export const COMBO_BOX_CONTEXT_KEY: InjectionKey<ComboBoxContextValue> =
  Symbol('HeroUIComboBoxContext')
