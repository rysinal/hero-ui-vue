// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import AlertDialog from './AlertDialog.vue'
import AlertDialogBackdrop from './AlertDialogBackdrop.vue'
import AlertDialogBody from './AlertDialogBody.vue'
import AlertDialogCloseTrigger from './AlertDialogCloseTrigger.vue'
import AlertDialogContainer from './AlertDialogContainer.vue'
import AlertDialogDialog from './AlertDialogDialog.vue'
import AlertDialogFooter from './AlertDialogFooter.vue'
import AlertDialogHeader from './AlertDialogHeader.vue'
import AlertDialogHeading from './AlertDialogHeading.vue'
import AlertDialogIcon from './AlertDialogIcon.vue'
import AlertDialogTrigger from './AlertDialogTrigger.vue'

type AlertDialogCompound = typeof AlertDialog & {
  Backdrop: typeof AlertDialogBackdrop
  Body: typeof AlertDialogBody
  CloseTrigger: typeof AlertDialogCloseTrigger
  Container: typeof AlertDialogContainer
  Dialog: typeof AlertDialogDialog
  Footer: typeof AlertDialogFooter
  Header: typeof AlertDialogHeader
  Heading: typeof AlertDialogHeading
  Icon: typeof AlertDialogIcon
  Root: typeof AlertDialog
  Trigger: typeof AlertDialogTrigger
}

export const AlertDialogNamespace: AlertDialogCompound = Object.assign(AlertDialog, {
  Backdrop: AlertDialogBackdrop,
  Body: AlertDialogBody,
  CloseTrigger: AlertDialogCloseTrigger,
  Container: AlertDialogContainer,
  Dialog: AlertDialogDialog,
  Footer: AlertDialogFooter,
  Header: AlertDialogHeader,
  Heading: AlertDialogHeading,
  Icon: AlertDialogIcon,
  Root: AlertDialog,
  Trigger: AlertDialogTrigger,
})
