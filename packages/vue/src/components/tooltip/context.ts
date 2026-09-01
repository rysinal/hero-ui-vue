import type { ComputedRef, InjectionKey } from 'vue'
import type { tooltipVariants } from '@rysinal/heroui-vue-styles'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipContextValue {
  slots: ComputedRef<ReturnType<typeof tooltipVariants>>
}

export const TOOLTIP_CONTEXT_KEY: InjectionKey<TooltipContextValue> = Symbol('HeroUITooltipContext')
