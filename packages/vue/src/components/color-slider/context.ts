/* global HTMLElement, KeyboardEvent, PointerEvent */
import type { ComputedRef, InjectionKey } from 'vue'
import type { colorSliderVariants } from '@rysinal/heroui-vue-styles'
import type { Color, ColorChannel } from '../../utils'

export interface ColorSliderContextValue {
  slots: ComputedRef<ReturnType<typeof colorSliderVariants>>
  value: ComputedRef<Color>
  channel: ComputedRef<ColorChannel>
  orientation: ComputedRef<'horizontal' | 'vertical'>
  isDisabled: ComputedRef<boolean>
  /** Thumb position along the track, 0 to 1. */
  percent: ComputedRef<number>
  /** Gradient showing the channel's range at the current colour. */
  trackBackground: ComputedRef<string>
  /** The track registers itself so the root can measure pointer positions. */
  registerTrack: (element: HTMLElement | null) => void
  onTrackPointerDown: (event: PointerEvent) => void
  onKeydown: (event: KeyboardEvent) => void
}

export const COLOR_SLIDER_CONTEXT_KEY: InjectionKey<ColorSliderContextValue> =
  Symbol('HeroUIColorSliderContext')
