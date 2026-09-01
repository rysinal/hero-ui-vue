// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Popover from './Popover.vue'
import PopoverArrow from './PopoverArrow.vue'
import PopoverContent from './PopoverContent.vue'
import PopoverDialog from './PopoverDialog.vue'
import PopoverHeading from './PopoverHeading.vue'
import PopoverTrigger from './PopoverTrigger.vue'

type PopoverCompound = typeof Popover & {
  Arrow: typeof PopoverArrow
  Content: typeof PopoverContent
  Dialog: typeof PopoverDialog
  Heading: typeof PopoverHeading
  Root: typeof Popover
  Trigger: typeof PopoverTrigger
}

export const PopoverNamespace: PopoverCompound = Object.assign(Popover, {
  Arrow: PopoverArrow,
  Content: PopoverContent,
  Dialog: PopoverDialog,
  Heading: PopoverHeading,
  Root: Popover,
  Trigger: PopoverTrigger,
})
