import type { ComputedRef, InjectionKey } from 'vue'
import type { colorAreaVariants } from '@rysinal/heroui-vue-styles'
import type { Color, ColorChannel } from '../../utils'

export interface ColorAreaContextValue {
  slots: ComputedRef<ReturnType<typeof colorAreaVariants>>
  value: ComputedRef<Color>
  xChannel: ComputedRef<ColorChannel>
  yChannel: ComputedRef<ColorChannel>
  isDisabled: ComputedRef<boolean>
  /** Thumb position as fractions of the area, 0 to 1. */
  position: ComputedRef<{ x: number; y: number }>
}

export const COLOR_AREA_CONTEXT_KEY: InjectionKey<ColorAreaContextValue> =
  Symbol('HeroUIColorAreaContext')
