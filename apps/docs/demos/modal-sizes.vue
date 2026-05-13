<template>
  <div class="flex flex-wrap gap-4">
    <Modal v-for="size in sizes" :key="size">
      <Button variant="secondary">
        {{ size.toUpperCase() }}
      </Button>
      <ModalBackdrop>
        <ModalContainer :size="size">
          <ModalDialog>
            <ModalCloseTrigger />
            <ModalHeader>
              <ModalIcon class="bg-default text-foreground">
                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h6v6" />
                  <path d="M9 21H3v-6" />
                  <path d="M21 3 14 10" />
                  <path d="M3 21 10 14" />
                </svg>
              </ModalIcon>
              <ModalHeading>{{ size.toUpperCase() }} Size</ModalHeading>
            </ModalHeader>
            <ModalBody>
              <p v-if="size === 'cover'">
                This modal uses the <code>cover</code> size variant. It spans the full available
                width while preserving modal aesthetics.
              </p>
              <p v-else-if="size === 'full'">
                This modal uses the <code>full</code> size variant. It occupies the entire viewport
                and removes rounded corners.
              </p>
              <p v-else>
                This modal uses the <code>{{ size }}</code> size variant. On mobile devices, modal
                sizes adapt to the available viewport width.
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
  type ModalSize,
} from '@rysinal/heroui-vue'

const sizes: ModalSize[] = ['xs', 'sm', 'md', 'lg', 'cover', 'full']
</script>
