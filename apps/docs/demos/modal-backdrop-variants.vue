<template>
  <div class="flex flex-wrap gap-4">
    <Modal v-for="variant in variants" :key="variant">
      <Button variant="secondary">
        {{ variantLabel(variant) }}
      </Button>
      <ModalBackdrop :variant="variant">
        <ModalContainer>
          <ModalDialog class="demo-modal-dialog">
            <ModalCloseTrigger />
            <ModalHeader>
              <ModalIcon class="bg-default text-foreground">
                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </ModalIcon>
              <ModalHeading>{{ variantLabel(variant) }} Backdrop</ModalHeading>
            </ModalHeader>
            <ModalBody>
              <p>
                This modal uses the <code>{{ variant }}</code> backdrop variant. Compare the
                overlay treatment and how much of the page remains visible.
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
  </div>
</template>

<script setup lang="ts">
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
  type ModalBackdropVariant,
} from '@rysinal/heroui-vue'

const variants: ModalBackdropVariant[] = ['opaque', 'blur', 'transparent']

const variantLabel = (variant: ModalBackdropVariant) =>
  variant.charAt(0).toUpperCase() + variant.slice(1)
</script>

<style lang="less">
.demo-modal-dialog {
  max-width: 22.5rem;
}
</style>
