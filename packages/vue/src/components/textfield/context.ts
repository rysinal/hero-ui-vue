import type { ComputedRef, InjectionKey } from 'vue'

export type TextFieldInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'color'
  | 'file'

export interface TextFieldContextValue {
  inputId: ComputedRef<string>
  isDisabled: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  isRequired: ComputedRef<boolean | undefined>
  name: ComputedRef<string | undefined>
  type: ComputedRef<TextFieldInputType | undefined>
  value: ComputedRef<string | number | undefined>
  variant: ComputedRef<'primary' | 'secondary' | undefined>
  setValue: (value: string | number) => void
}

export const TEXT_FIELD_CONTEXT_KEY: InjectionKey<TextFieldContextValue> =
  Symbol('HeroUITextFieldContext')
