import type { ComputedRef, InjectionKey } from 'vue'
import type { switchVariants } from '@rysinal/heroui-vue-styles'

export interface SwitchRenderState {
  isSelected: boolean
  isDisabled: boolean
}

export interface SwitchContextValue {
  slots: ComputedRef<ReturnType<typeof switchVariants>>
  state: ComputedRef<SwitchRenderState>
}

export const SWITCH_CONTEXT_KEY: InjectionKey<SwitchContextValue> = Symbol('HeroUISwitchContext')
