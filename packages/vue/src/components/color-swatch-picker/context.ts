import type { ComputedRef, InjectionKey } from 'vue'
import type { colorSwatchPickerVariants } from '@rysinal/heroui-vue-styles'
import type { Color } from '../../utils'

export interface ColorSwatchPickerContextValue {
  slots: ComputedRef<ReturnType<typeof colorSwatchPickerVariants>>
  value: ComputedRef<Color | null>
  select: (color: Color) => void
  isSelected: (color: Color) => boolean
  isDisabled: ComputedRef<boolean>
}

export interface ColorSwatchPickerItemContextValue {
  color: ComputedRef<Color>
  isSelected: ComputedRef<boolean>
  slots: ComputedRef<ReturnType<typeof colorSwatchPickerVariants>>
}

export const COLOR_SWATCH_PICKER_KEY: InjectionKey<ColorSwatchPickerContextValue> =
  Symbol('HeroUIColorSwatchPicker')

export const COLOR_SWATCH_PICKER_ITEM_KEY: InjectionKey<ColorSwatchPickerItemContextValue> =
  Symbol('HeroUIColorSwatchPickerItem')
