// Compound namespace: mirrors the React dot-notation API
// (Dropdown.Trigger, Dropdown.Item, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownItemIndicator from './DropdownItemIndicator.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownPopover from './DropdownPopover.vue'
import DropdownSection from './DropdownSection.vue'
import DropdownSubmenuIndicator from './DropdownSubmenuIndicator.vue'
import DropdownSubmenuTrigger from './DropdownSubmenuTrigger.vue'
import DropdownTrigger from './DropdownTrigger.vue'

type DropdownCompound = typeof Dropdown & {
  Item: typeof DropdownItem
  ItemIndicator: typeof DropdownItemIndicator
  Menu: typeof DropdownMenu
  Popover: typeof DropdownPopover
  Root: typeof Dropdown
  Section: typeof DropdownSection
  SubmenuIndicator: typeof DropdownSubmenuIndicator
  SubmenuTrigger: typeof DropdownSubmenuTrigger
  Trigger: typeof DropdownTrigger
}

export const DropdownNamespace: DropdownCompound = Object.assign(Dropdown, {
  Item: DropdownItem,
  ItemIndicator: DropdownItemIndicator,
  Menu: DropdownMenu,
  Popover: DropdownPopover,
  Root: Dropdown,
  Section: DropdownSection,
  SubmenuIndicator: DropdownSubmenuIndicator,
  SubmenuTrigger: DropdownSubmenuTrigger,
  Trigger: DropdownTrigger,
})
