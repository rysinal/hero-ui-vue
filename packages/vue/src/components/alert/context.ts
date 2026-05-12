import type { InjectionKey } from 'vue'
import type { alertVariants } from '@rysinal/heroui-vue-styles'

export type AlertStatus = 'default' | 'accent' | 'success' | 'warning' | 'danger'

export interface AlertContext {
  slots: ReturnType<typeof alertVariants>
  status?: AlertStatus
}

export const ALERT_CONTEXT_KEY: InjectionKey<AlertContext> = Symbol('AlertContext')
