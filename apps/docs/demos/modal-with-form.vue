<template>
  <Modal>
    <Button variant="secondary">Open Contact Form</Button>
    <ModalBackdrop>
      <ModalContainer placement="auto">
        <ModalDialog class="demo-modal-form-dialog">
          <ModalCloseTrigger />
          <ModalHeader>
            <ModalIcon class="bg-accent-soft text-accent-soft-foreground">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </ModalIcon>
            <ModalHeading>Contact Us</ModalHeading>
            <p class="demo-modal-form-copy">
              Fill out the form below and we'll get back to you. The modal adapts automatically
              when the keyboard appears on mobile.
            </p>
          </ModalHeader>
          <ModalBody class="demo-modal-form-body">
            <Surface>
              <form class="demo-modal-form">
                <TextField class="w-full" label="Name" name="name" placeholder="Enter your name" />
                <TextField class="w-full" label="Email" name="email" placeholder="Enter your email" type="email" />
                <TextField class="w-full" label="Phone" name="phone" placeholder="Enter your phone number" type="tel" />
                <TextField class="w-full" label="Company" name="company" placeholder="Enter your company name" />
                <TextField class="w-full" label="Message" name="message" placeholder="Enter your message" />
              </form>
            </Surface>
          </ModalBody>
          <ModalFooter v-slot="{ close }">
            <Button variant="secondary" @click="close">Cancel</Button>
            <Button @click="close">Send Message</Button>
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
  Surface,
  TextField,
} from '@rysinal/heroui-vue'
</script>

<style lang="less">
.demo-modal-form-dialog {
  max-width: 28rem;
}

.demo-modal-form-copy {
  margin: 0.375rem 0 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--muted);
}

.demo-modal-form-body {
  padding: 1.5rem;
}

.demo-modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
