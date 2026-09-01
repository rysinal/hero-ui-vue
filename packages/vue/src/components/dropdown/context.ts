import type { ComputedRef, InjectionKey } from 'vue'
import type { dropdownVariants, menuItemVariants } from '@rysinal/heroui-vue-styles'

export type DropdownKey = string | number
export type DropdownSelectionMode = 'none' | 'single' | 'multiple'

export interface DropdownMenuSelection {
  selectionMode?: DropdownSelectionMode
  selectedKeys?: DropdownKey[]
  defaultSelectedKeys?: DropdownKey[]
  onSelectionChange?: (keys: DropdownKey[]) => void
}

export interface DropdownContextValue {
  slots: ComputedRef<ReturnType<typeof dropdownVariants>>
  selectionMode: ComputedRef<DropdownSelectionMode>
  selectedKeys: ComputedRef<DropdownKey[]>
  toggleKey: (key: DropdownKey) => void
  /** Lets Dropdown.Menu declare the selection, as React does. */
  adoptMenuSelection: (selection: DropdownMenuSelection) => void
  reportAction: (key: DropdownKey | undefined) => void
}

export interface DropdownItemContextValue {
  slots: ComputedRef<ReturnType<typeof menuItemVariants>>
  isSelected: ComputedRef<boolean>
  hasSubmenu: ComputedRef<boolean>
}

export const DROPDOWN_CONTEXT_KEY: InjectionKey<DropdownContextValue> =
  Symbol('HeroUIDropdownContext')

export const DROPDOWN_ITEM_CONTEXT_KEY: InjectionKey<DropdownItemContextValue> =
  Symbol('HeroUIDropdownItemContext')

/** Set inside a SubmenuTrigger so the item knows to show its chevron. */
export const DROPDOWN_SUBMENU_KEY: InjectionKey<boolean> = Symbol('HeroUIDropdownSubmenu')
