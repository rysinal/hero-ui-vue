import type { ComputedRef, InjectionKey } from 'vue'

export type ListBoxKey = string | number
export type ListBoxSelectionMode = 'none' | 'single' | 'multiple'

export interface ListBoxContext {
  disabledKeySet: ComputedRef<Set<ListBoxKey>>
  isDisabled: ComputedRef<boolean | undefined>
  selectedKeySet: ComputedRef<Set<ListBoxKey>>
  selectionMode: ComputedRef<ListBoxSelectionMode>
  variant: ComputedRef<'default' | 'danger'>
  actionKey: (key: ListBoxKey) => void
  toggleKey: (key: ListBoxKey) => void
}

export interface ListBoxItemContext {
  isDisabled: ComputedRef<boolean | undefined>
  isSelected: ComputedRef<boolean | undefined>
}

export const LIST_BOX_CONTEXT_KEY: InjectionKey<ListBoxContext> = Symbol('ListBoxContext')
export const LIST_BOX_ITEM_CONTEXT_KEY: InjectionKey<ListBoxItemContext> =
  Symbol('ListBoxItemContext')
