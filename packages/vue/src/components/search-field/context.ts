import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface SearchFieldContext {
  clear: () => void
  inputRef: Ref<HTMLInputElement | null>
  isDisabled: ComputedRef<boolean | undefined>
  isFocused: Ref<boolean>
  isInvalid: ComputedRef<boolean | undefined>
  isRequired: ComputedRef<boolean | undefined>
  name: ComputedRef<string | undefined>
  setFocused: (focused: boolean) => void
  slots: ComputedRef<{
    base: () => string
    clearButton: () => string
    group: () => string
    input: () => string
    searchIcon: () => string
  }>
  submit: () => void
  value: ComputedRef<string>
  updateValue: (value: string) => void
}

export const SEARCH_FIELD_CONTEXT_KEY: InjectionKey<SearchFieldContext> =
  Symbol('SearchFieldContext')
