<template>
  <div class="flex flex-wrap gap-4">
    <Modal v-for="animation in animations" :key="animation.name">
      <Button variant="secondary">{{ animation.name }}</Button>
      <ModalBackdrop :class="animation.backdropClass">
        <ModalContainer :class="animation.containerClass">
          <ModalDialog class="demo-modal-dialog">
            <ModalCloseTrigger />
            <ModalHeader>
              <ModalIcon class="bg-default text-foreground">
                <svg v-if="animation.icon === 'sparkles'" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9.9 10.8 8 17l-1.9-6.2L0 9l6.1-1.8L8 1l1.9 6.2L16 9l-6.1 1.8Z" />
                  <path d="M18 16.5 17 20l-1-3.5-3.5-1 3.5-1 1-3.5 1 3.5 3.5 1-3.5 1Z" />
                </svg>
                <svg v-else class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                  <path d="M5 22h14" />
                </svg>
              </ModalIcon>
              <ModalHeading>{{ animation.name }} Animation</ModalHeading>
            </ModalHeader>
            <ModalBody>
              <p>{{ animation.description }}</p>
            </ModalBody>
            <ModalFooter v-slot="{ close }">
              <Button variant="tertiary" @click="close">Close</Button>
              <Button @click="close">Try Again</Button>
            </ModalFooter>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </Modal>
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

const animations = [
  {
    backdropClass: 'data-[entering]:duration-400 data-[exiting]:duration-200',
    containerClass:
      'data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[entering]:duration-400 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[exiting]:duration-200',
    description:
      'Physics-based elastic scaling with a fast response and longer settling time. Useful for modal and popover entrances.',
    icon: 'sparkles',
    name: 'Kinematic Scale',
  },
  {
    backdropClass: 'data-[entering]:duration-500 data-[exiting]:duration-200',
    containerClass:
      'data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:slide-in-from-bottom-4 data-[entering]:duration-500 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:slide-out-to-bottom-2 data-[exiting]:duration-200',
    description:
      'A grounded slide motion for bottom-sheet style content and task-focused overlays.',
    icon: 'arrow',
    name: 'Fluid Slide',
  },
]
</script>

<style lang="less">
.demo-modal-dialog {
  max-width: 22.5rem;
}
</style>
