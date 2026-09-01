import type { ComputedRef, InjectionKey } from 'vue'
import type { checkboxVariants } from '@rysinal/heroui-vue-styles'

export interface CheckboxRenderState {
  isSelected: boolean
  isIndeterminate: boolean
  isDisabled: boolean
  isInvalid: boolean
  isReadOnly: boolean
}

export interface CheckboxContextValue {
  slots: ComputedRef<ReturnType<typeof checkboxVariants>>
  state: ComputedRef<CheckboxRenderState>
  /** Set once a Control is composed explicitly, so the root skips its default. */
  registerControl: () => void
  hasComposedControl: ComputedRef<boolean>
}

export const CHECKBOX_CONTEXT_KEY: InjectionKey<CheckboxContextValue> =
  Symbol('HeroUICheckboxContext')
