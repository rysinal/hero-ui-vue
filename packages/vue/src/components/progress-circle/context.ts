import type { ComputedRef, InjectionKey } from 'vue'
import type { progressCircleVariants } from '@rysinal/heroui-vue-styles'

export interface ProgressCircleGeometry {
  center: number
  radius: number
  strokeWidth: number
  circumference: number
  dashOffset: number
}

export interface ProgressCircleContextValue {
  slots: ComputedRef<ReturnType<typeof progressCircleVariants>>
  geometry: ComputedRef<ProgressCircleGeometry>
}

export const PROGRESS_CIRCLE_CONTEXT_KEY: InjectionKey<ProgressCircleContextValue> =
  Symbol('HeroUIProgressCircleContext')
