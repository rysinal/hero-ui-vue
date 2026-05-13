<template>
  <Modal>
    <Button variant="secondary">Open Modal</Button>
    <ModalBackdrop class="demo-modal-premium-backdrop">
      <ModalContainer>
        <ModalDialog class="demo-modal-premium-dialog">
          <ModalCloseTrigger />
          <ModalHeader class="demo-modal-premium-header">
            <ModalIcon class="bg-accent-soft text-accent-soft-foreground">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3 14.8 8.7 21 9.6l-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z" />
              </svg>
            </ModalIcon>
            <ModalHeading>Premium Backdrop</ModalHeading>
          </ModalHeader>
          <ModalBody>
            <p>
              This modal uses custom backdrop styling to create a branded overlay treatment while
              preserving the same interaction behavior.
            </p>
          </ModalBody>
          <ModalFooter v-slot="{ close }" class="demo-modal-premium-footer">
            <Button variant="secondary" @click="close">Maybe Later</Button>
            <Button @click="close">Upgrade Now</Button>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </ModalBackdrop>
  </Modal>
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
.demo-modal-premium-backdrop {
  background:
    radial-gradient(circle at 50% 35%, rgb(255 255 255 / 0.28), transparent 28rem),
    rgb(20 20 24 / 0.72);
  backdrop-filter: blur(1rem);
}

.demo-modal-premium-dialog {
  max-width: 22.5rem;
}

.demo-modal-premium-header {
  align-items: center;
  text-align: center;
}

.demo-modal-premium-footer {
  flex-direction: column-reverse;
}
</style>
