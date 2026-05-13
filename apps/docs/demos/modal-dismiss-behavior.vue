<template>
  <div class="demo-modal-dismiss">
    <section class="demo-modal-section">
      <h3 class="demo-modal-section-title">isDismissable = false</h3>
      <p class="demo-modal-section-copy">
        Controls whether the modal can be dismissed by clicking the overlay backdrop.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <ModalBackdrop :is-dismissable="false">
          <ModalContainer>
            <ModalDialog class="demo-modal-dialog">
              <ModalCloseTrigger />
              <ModalHeader>
                <ModalIcon class="bg-default text-foreground">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                </ModalIcon>
                <ModalHeading>isDismissable = false</ModalHeading>
              </ModalHeader>
              <ModalBody>
                <p>
                  Try clicking outside this modal on the overlay. It will not close. Use the close
                  button or footer action instead.
                </p>
              </ModalBody>
              <ModalFooter v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button @click="close">Confirm</Button>
              </ModalFooter>
            </ModalDialog>
          </ModalContainer>
        </ModalBackdrop>
      </Modal>
    </section>

    <section class="demo-modal-section">
      <h3 class="demo-modal-section-title">isKeyboardDismissDisabled = true</h3>
      <p class="demo-modal-section-copy">
        Controls whether the Escape key can dismiss the modal.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <ModalBackdrop is-keyboard-dismiss-disabled>
          <ModalContainer>
            <ModalDialog class="demo-modal-dialog">
              <ModalCloseTrigger />
              <ModalHeader>
                <ModalIcon class="bg-default text-foreground">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                  </svg>
                </ModalIcon>
                <ModalHeading>Escape Dismiss Disabled</ModalHeading>
              </ModalHeader>
              <ModalBody>
                <p>
                  Pressing Escape will not close this modal. Click the close button, footer action,
                  or backdrop to dismiss it.
                </p>
              </ModalBody>
              <ModalFooter v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button @click="close">Confirm</Button>
              </ModalFooter>
            </ModalDialog>
          </ModalContainer>
        </ModalBackdrop>
      </Modal>
    </section>
  </div>
</template>

<script setup>
import {
  Button,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseTrigger,
  ModalContainer,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalHeading,
  ModalIcon,
} from '@rysinal/heroui-vue'
</script>

<style lang="less">
.demo-modal-dismiss {
  display: flex;
  max-width: 42rem;
  flex-direction: column;
  gap: 2rem;
}

.demo-modal-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.demo-modal-dismiss .demo-modal-section-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--foreground);
}

.demo-modal-section-copy {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

.demo-modal-dialog {
  max-width: 22.5rem;
}
</style>
