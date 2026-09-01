/* global HTMLElement */
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { selectVariants } from '@rysinal/heroui-vue-styles'

export type SelectKey = string | number
export type SelectSelectionMode = 'single' | 'multiple'

export interface SelectItemRecord {
  key: SelectKey
  textValue: string
}

export interface SelectContext {
  disabledKeySet: ComputedRef<Set<SelectKey>>
  hasSelection: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  isOpen: ComputedRef<boolean>
  isRequired: ComputedRef<boolean | undefined>
  placeholder: ComputedRef<string>
  selectedItems: ComputedRef<SelectItemRecord[]>
  selectedKeys: ComputedRef<SelectKey[]>
  selectedKeySet: ComputedRef<Set<SelectKey>>
  selectionMode: ComputedRef<SelectSelectionMode>
  slots: ComputedRef<ReturnType<typeof selectVariants>>
  triggerElement: Ref<HTMLElement | null>
  close: () => void
  registerItem: (item: SelectItemRecord) => void
  setOpen: (nextOpen: boolean) => void
  setSelectedKeys: (keys: SelectKey[]) => void
  setTriggerElement: (element: HTMLElement | null) => void
  unregisterItem: (key: SelectKey) => void
}

export const SELECT_CONTEXT_KEY: InjectionKey<SelectContext> = Symbol('SelectContext')
