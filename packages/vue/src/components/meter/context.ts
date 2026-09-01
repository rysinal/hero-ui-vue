import type { ComputedRef, InjectionKey } from 'vue'
import type { meterVariants } from '@rysinal/heroui-vue-styles'

export interface MeterContextValue {
  slots: ComputedRef<ReturnType<typeof meterVariants>>
  /** Fill width as a percentage, or undefined while indeterminate. */
  percentage: ComputedRef<number | undefined>
}

export const METER_CONTEXT_KEY: InjectionKey<MeterContextValue> =
  Symbol('HeroUIMeterContext')
