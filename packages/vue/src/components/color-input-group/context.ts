import type { ComputedRef, InjectionKey } from 'vue'
import type { colorInputGroupVariants } from '@rysinal/heroui-vue-styles'

export interface ColorInputGroupContextValue {
  slots: ComputedRef<ReturnType<typeof colorInputGroupVariants>>
}

export const COLOR_INPUT_GROUP_KEY: InjectionKey<ColorInputGroupContextValue> =
  Symbol('HeroUIColorInputGroup')
