import type { ComputedRef, InjectionKey } from 'vue'
import type { Color, ColorChannel } from '../../utils'

export interface ColorFieldContextValue {
  value: ComputedRef<Color | null>
  text: ComputedRef<string>
  setText: (value: string) => void
  channel: ComputedRef<ColorChannel | undefined>
  isDisabled: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean>
  isRequired: ComputedRef<boolean | undefined>
  placeholder: ComputedRef<string | undefined>
}

export const COLOR_FIELD_CONTEXT_KEY: InjectionKey<ColorFieldContextValue> =
  Symbol('HeroUIColorFieldContext')
