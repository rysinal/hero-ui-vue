import type { ComputedRef, InjectionKey } from 'vue'
import type { radioVariants } from '@rysinal/heroui-vue-styles'

export interface RadioRenderState {
  isSelected: boolean
  isDisabled: boolean
  isInvalid: boolean
}

export interface RadioContextValue {
  slots: ComputedRef<ReturnType<typeof radioVariants>>
  state: ComputedRef<RadioRenderState>
}

export const RADIO_CONTEXT_KEY: InjectionKey<RadioContextValue> = Symbol('HeroUIRadioContext')
