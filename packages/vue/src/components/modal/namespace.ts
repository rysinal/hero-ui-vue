// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Modal from './Modal.vue'
import ModalBackdrop from './ModalBackdrop.vue'
import ModalBody from './ModalBody.vue'
import ModalCloseTrigger from './ModalCloseTrigger.vue'
import ModalContainer from './ModalContainer.vue'
import ModalDialog from './ModalDialog.vue'
import ModalFooter from './ModalFooter.vue'
import ModalHeader from './ModalHeader.vue'
import ModalHeading from './ModalHeading.vue'
import ModalIcon from './ModalIcon.vue'
import ModalTrigger from './ModalTrigger.vue'

type ModalCompound = typeof Modal & {
  Backdrop: typeof ModalBackdrop
  Body: typeof ModalBody
  CloseTrigger: typeof ModalCloseTrigger
  Container: typeof ModalContainer
  Dialog: typeof ModalDialog
  Footer: typeof ModalFooter
  Header: typeof ModalHeader
  Heading: typeof ModalHeading
  Icon: typeof ModalIcon
  Root: typeof Modal
  Trigger: typeof ModalTrigger
}

export const ModalNamespace: ModalCompound = Object.assign(Modal, {
  Backdrop: ModalBackdrop,
  Body: ModalBody,
  CloseTrigger: ModalCloseTrigger,
  Container: ModalContainer,
  Dialog: ModalDialog,
  Footer: ModalFooter,
  Header: ModalHeader,
  Heading: ModalHeading,
  Icon: ModalIcon,
  Root: Modal,
  Trigger: ModalTrigger,
})
