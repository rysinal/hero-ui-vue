import type { InjectionKey } from 'vue'
import type { linkVariants } from '@heroui/styles'

export interface LinkContext {
  slots?: ReturnType<typeof linkVariants>
}

export const LINK_CONTEXT_KEY: InjectionKey<LinkContext> =
  Symbol('link-context')
