import type { InjectionKey, Ref } from 'vue'

export interface CheckboxGroupContext {
  isDisabled?: Ref<boolean | undefined>
  isInvalid?: Ref<boolean | undefined>
  isRequired?: Ref<boolean | undefined>
  name?: Ref<string | undefined>
  selectedValues: Ref<string[]>
  toggleValue: (value: string, isSelected: boolean) => void
  variant?: Ref<'primary' | 'secondary' | undefined>
}

export const CHECKBOX_GROUP_CONTEXT_KEY: InjectionKey<CheckboxGroupContext> =
  Symbol('CheckboxGroupContext')
