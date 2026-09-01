<script setup lang="ts">
import { Toast, type ToastPlacement, type ToastQueue } from '@rysinal/heroui-vue'

defineProps<{ queue?: ToastQueue; placement?: ToastPlacement }>()
</script>

<template>
  <Toast.Provider :placement="placement" :queue="queue">
    <Toast.Indicator />
    <Toast.Content>
      <Toast.Title />
      <Toast.Description />
    </Toast.Content>
    <Toast.ActionButton />
    <Toast.CloseButton />
  </Toast.Provider>
</template>
