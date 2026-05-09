import type { ComputedRef, InjectionKey } from 'vue'

export interface RadioGroupContext {
  isDisabled: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  isReadOnly: ComputedRef<boolean | undefined>
  selectedValue: ComputedRef<string | undefined>
}

export const RADIO_GROUP_CONTEXT_KEY: InjectionKey<RadioGroupContext> = Symbol('RadioGroupContext')
