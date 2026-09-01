import type { ComputedRef, InjectionKey } from 'vue'

export type SeparatorOrientation = 'horizontal' | 'vertical'

export interface SeparatorContextValue {
  /** Orientation imposed by an ancestor, e.g. a Toolbar crossing its own axis. */
  orientation: ComputedRef<SeparatorOrientation>
}

export const SEPARATOR_CONTEXT_KEY: InjectionKey<SeparatorContextValue> =
  Symbol('HeroUISeparatorContext')
