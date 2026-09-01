import type { InjectionKey, ComputedRef } from 'vue'
import type { toggleButtonGroupVariants } from '@rysinal/heroui-vue-styles'

export type ToggleButtonGroupKey = string | number
export type ToggleButtonGroupSelectionMode = 'single' | 'multiple'

export interface ToggleButtonGroupContextValue {
  isDisabled: ComputedRef<boolean | undefined>
  isSelected: (key: ToggleButtonGroupKey) => boolean
  /** Present only when the group drives selection, i.e. a selectionMode is set. */
  selectionMode: ComputedRef<ToggleButtonGroupSelectionMode | undefined>
  size: ComputedRef<'sm' | 'md' | 'lg' | undefined>
  slots: ComputedRef<ReturnType<typeof toggleButtonGroupVariants>>
  toggleKey: (key: ToggleButtonGroupKey) => void
}

export const TOGGLE_BUTTON_GROUP_CONTEXT_KEY: InjectionKey<ToggleButtonGroupContextValue> = Symbol(
  'HeroUIToggleButtonGroupContext',
)
