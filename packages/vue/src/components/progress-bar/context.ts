import type { ComputedRef, InjectionKey } from 'vue'
import type { progressBarVariants } from '@rysinal/heroui-vue-styles'

export interface ProgressBarContextValue {
  slots: ComputedRef<ReturnType<typeof progressBarVariants>>
  /** Fill width as a percentage, or undefined while indeterminate. */
  percentage: ComputedRef<number | undefined>
  /** Formatted output text, honouring formatOptions and valueLabel. */
  valueText: ComputedRef<string | undefined>
}

export const PROGRESS_BAR_CONTEXT_KEY: InjectionKey<ProgressBarContextValue> =
  Symbol('HeroUIProgressBarContext')
