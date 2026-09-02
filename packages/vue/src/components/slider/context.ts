import type { ComputedRef, InjectionKey } from 'vue'
import type { sliderVariants } from '@rysinal/heroui-vue-styles'

export type SliderOrientation = 'horizontal' | 'vertical'

export interface SliderState {
  /** Current thumb values, always an array even for a single thumb. */
  values: number[]
  /** Position of each thumb as a fraction between 0 and 1. */
  percents: number[]
  isDisabled: boolean
  /** True while a thumb is being dragged; slider.css changes the cursor. */
  isDragging: boolean
  orientation: SliderOrientation
  /** Formatted label for each thumb, honouring formatOptions. */
  labels: string[]
}

export interface SliderContextValue {
  slots: ComputedRef<ReturnType<typeof sliderVariants>>
  state: ComputedRef<SliderState>
}

export const SLIDER_CONTEXT_KEY: InjectionKey<SliderContextValue> = Symbol('HeroUISliderContext')
