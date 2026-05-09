import type { ComputedRef, InjectionKey } from 'vue'
import type { paginationVariants } from '@heroui/styles'

type PaginationSlots = ReturnType<typeof paginationVariants>

export interface PaginationContext {
  slots: ComputedRef<PaginationSlots>
}

export const PAGINATION_CONTEXT_KEY: InjectionKey<PaginationContext> = Symbol('PaginationContext')
