<template>
  <div class="flex flex-wrap gap-4">
    <Modal v-for="placement in placements" :key="placement">
      <Button variant="secondary">
        {{ placementLabel(placement) }}
      </Button>
      <ModalBackdrop>
        <ModalContainer :placement="placement">
          <ModalDialog class="demo-modal-dialog">
            <ModalCloseTrigger />
            <ModalHeader>
              <ModalIcon class="bg-default text-foreground">
                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20" />
                  <path d="m18 8-6-6-6 6" />
                  <path d="m18 16-6 6-6-6" />
                </svg>
              </ModalIcon>
              <ModalHeading>{{ placementLabel(placement) }} Placement</ModalHeading>
            </ModalHeader>
            <ModalBody>
              <p>
                This modal uses the <code>{{ placement }}</code> placement option. Try different
                placements to see how the dialog positions itself on the screen.
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
  type ModalPlacement,
} from '@rysinal/heroui-vue'

const placements: ModalPlacement[] = ['auto', 'top', 'center', 'bottom']

const placementLabel = (placement: ModalPlacement) =>
  placement.charAt(0).toUpperCase() + placement.slice(1)
</script>

<style lang="less">
.demo-modal-dialog {
  max-width: 22.5rem;
}
</style>
