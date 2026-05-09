import type { InjectionKey } from 'vue'
import type { buttonGroupVariants } from '@heroui/styles'

export interface ButtonGroupContext {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-soft' | 'outline' | 'ghost'
  isDisabled?: boolean
  fullWidth?: boolean
  slots?: ReturnType<typeof buttonGroupVariants>
}

export const BUTTON_GROUP_CONTEXT_KEY: InjectionKey<ButtonGroupContext> = Symbol(
  'button-group',
)
