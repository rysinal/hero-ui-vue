import type { ComputedRef, InjectionKey } from 'vue'
import type { kbdVariants } from '@rysinal/heroui-vue-styles'

export interface KbdContextValue {
  slots: ComputedRef<ReturnType<typeof kbdVariants>>
}

export const KBD_CONTEXT_KEY: InjectionKey<KbdContextValue> = Symbol('HeroUIKbdContext')
