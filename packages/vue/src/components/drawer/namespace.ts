// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Drawer from './Drawer.vue'
import DrawerBackdrop from './DrawerBackdrop.vue'
import DrawerBody from './DrawerBody.vue'
import DrawerCloseTrigger from './DrawerCloseTrigger.vue'
import DrawerContent from './DrawerContent.vue'
import DrawerDialog from './DrawerDialog.vue'
import DrawerFooter from './DrawerFooter.vue'
import DrawerHandle from './DrawerHandle.vue'
import DrawerHeader from './DrawerHeader.vue'
import DrawerHeading from './DrawerHeading.vue'
import DrawerTrigger from './DrawerTrigger.vue'

type DrawerCompound = typeof Drawer & {
  Backdrop: typeof DrawerBackdrop
  Body: typeof DrawerBody
  CloseTrigger: typeof DrawerCloseTrigger
  Content: typeof DrawerContent
  Dialog: typeof DrawerDialog
  Footer: typeof DrawerFooter
  Handle: typeof DrawerHandle
  Header: typeof DrawerHeader
  Heading: typeof DrawerHeading
  Root: typeof Drawer
  Trigger: typeof DrawerTrigger
}

export const DrawerNamespace: DrawerCompound = Object.assign(Drawer, {
  Backdrop: DrawerBackdrop,
  Body: DrawerBody,
  CloseTrigger: DrawerCloseTrigger,
  Content: DrawerContent,
  Dialog: DrawerDialog,
  Footer: DrawerFooter,
  Handle: DrawerHandle,
  Header: DrawerHeader,
  Heading: DrawerHeading,
  Root: Drawer,
  Trigger: DrawerTrigger,
})
