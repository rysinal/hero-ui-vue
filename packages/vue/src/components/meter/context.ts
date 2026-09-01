import type { ComputedRef, InjectionKey } from 'vue'
import type { meterVariants } from '@rysinal/heroui-vue-styles'

export interface MeterContextValue {
  slots: ComputedRef<ReturnType<typeof meterVariants>>
  /** Fill width as a percentage, or undefined while indeterminate. */
  percentage: ComputedRef<number | undefined>
  /** Formatted output text, honouring formatOptions and valueLabel. */
  valueText: ComputedRef<string>
}

export const METER_CONTEXT_KEY: InjectionKey<MeterContextValue> =
  Symbol('HeroUIMeterContext')
