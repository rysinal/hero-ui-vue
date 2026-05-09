import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface NumberFieldContext {
  decrement: () => void
  formatValue: (value: number | undefined) => string
  id: ComputedRef<string>
  increment: () => void
  inputRef: Ref<HTMLInputElement | null>
  inputText: ComputedRef<string>
  isDecrementDisabled: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean | undefined>
  isFocused: Ref<boolean>
  isIncrementDisabled: ComputedRef<boolean>
  isInvalid: ComputedRef<boolean | undefined>
  isRequired: ComputedRef<boolean | undefined>
  maxValue: ComputedRef<number | undefined>
  minValue: ComputedRef<number | undefined>
  name: ComputedRef<string | undefined>
  parseInput: (value: string) => void
  setFocused: (focused: boolean) => void
  slots: ComputedRef<{
    base: () => string
    decrementButton: () => string
    group: () => string
    incrementButton: () => string
    input: () => string
  }>
  step: ComputedRef<number>
  value: ComputedRef<number | undefined>
}

export const NUMBER_FIELD_CONTEXT_KEY: InjectionKey<NumberFieldContext> =
  Symbol('NumberFieldContext')
