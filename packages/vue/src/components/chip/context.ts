import type { InjectionKey } from 'vue'
import type { chipVariants } from '@heroui/styles'

export interface ChipContext {
  slots: ReturnType<typeof chipVariants>
}

export const CHIP_CONTEXT_KEY: InjectionKey<ChipContext> = Symbol('ChipContext')
