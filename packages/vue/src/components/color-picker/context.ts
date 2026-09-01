import type { ComputedRef, InjectionKey } from 'vue'
import type { colorPickerVariants } from '@rysinal/heroui-vue-styles'
import type { Color } from '../../utils'

export interface ColorPickerContextValue {
  slots: ComputedRef<ReturnType<typeof colorPickerVariants>>
  value: ComputedRef<Color>
  setValue: (color: Color) => void
  isOpen: ComputedRef<boolean>
  setOpen: (open: boolean) => void
}

export const COLOR_PICKER_CONTEXT_KEY: InjectionKey<ColorPickerContextValue> =
  Symbol('HeroUIColorPickerContext')
