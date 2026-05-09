import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface InputOTPContext {
  activeIndex: Ref<number>
  focusAt: (index: number) => void
  inputRef: Ref<HTMLInputElement | null>
  isDisabled: ComputedRef<boolean | undefined>
  isFocused: Ref<boolean>
  isInvalid: ComputedRef<boolean | undefined>
  maxLength: ComputedRef<number>
  name: ComputedRef<string | undefined>
  setValue: (value: string) => void
  slots: ComputedRef<{
    base: () => string
    caret: () => string
    group: () => string
    input: () => string
    separator: () => string
    slot: () => string
    slotValue: () => string
  }>
  value: ComputedRef<string>
}

export const INPUT_OTP_CONTEXT_KEY: InjectionKey<InputOTPContext> =
  Symbol('InputOTPContext')
