import type { ComputedRef, InjectionKey } from 'vue'

export type DisclosureGroupKey = string | number

export interface DisclosureGroupContext {
  isDisabled: ComputedRef<boolean | undefined>
  isExpanded: (id: DisclosureGroupKey) => boolean
  toggle: (id: DisclosureGroupKey) => void
}

export const DISCLOSURE_GROUP_CONTEXT_KEY: InjectionKey<DisclosureGroupContext> =
  Symbol('DisclosureGroupContext')
