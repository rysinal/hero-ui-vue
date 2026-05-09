import type { ComputedRef, InjectionKey } from 'vue'

export type TagGroupKey = string | number
export type TagGroupSelectionMode = 'none' | 'single' | 'multiple'

export interface TagGroupContext {
  disabledKeySet: ComputedRef<Set<TagGroupKey>>
  isDisabled: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  selectedKeySet: ComputedRef<Set<TagGroupKey>>
  selectionMode: ComputedRef<TagGroupSelectionMode>
  size: ComputedRef<'sm' | 'md' | 'lg'>
  variant: ComputedRef<'default' | 'surface'>
  removeKey: (key: TagGroupKey) => void
  toggleKey: (key: TagGroupKey) => void
}

export const TAG_GROUP_CONTEXT_KEY: InjectionKey<TagGroupContext> = Symbol('TagGroupContext')
