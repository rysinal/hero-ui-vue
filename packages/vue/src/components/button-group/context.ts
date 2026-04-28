import type { InjectionKey } from 'vue'

export interface ButtonGroupContext {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-soft' | 'outline' | 'ghost'
  isDisabled?: boolean
  fullWidth?: boolean
}

export const BUTTON_GROUP_CONTEXT_KEY: InjectionKey<ButtonGroupContext> = Symbol(
  'button-group',
)
