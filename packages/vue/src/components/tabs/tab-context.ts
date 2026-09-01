import type { ComputedRef, InjectionKey } from 'vue'

export interface TabContextValue {
  isSelected: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean | undefined>
}

export const TAB_CONTEXT_KEY: InjectionKey<TabContextValue> = Symbol('HeroUITabContext')

/** True inside a Tabs.ListContainer, so TabList knows not to wrap itself. */
export const TAB_LIST_CONTAINER_KEY: InjectionKey<boolean> = Symbol('HeroUITabListContainer')
