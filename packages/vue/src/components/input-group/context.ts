import type { ComputedRef, InjectionKey } from 'vue'
import type { inputGroupVariants } from '@rysinal/heroui-vue-styles'

export interface InputGroupContextValue {
  slots: ComputedRef<ReturnType<typeof inputGroupVariants>>
}

export const INPUT_GROUP_CONTEXT_KEY: InjectionKey<InputGroupContextValue> =
  Symbol('HeroUIInputGroupContext')
