import type { InjectionKey } from 'vue'
import type { fieldsetVariants } from '@heroui/styles'

export interface FieldsetContextValue {
  slots: ReturnType<typeof fieldsetVariants>
}

export const FIELDSET_CONTEXT_KEY: InjectionKey<FieldsetContextValue> = Symbol('HeroUIFieldsetContext')

