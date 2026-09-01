<template>
  <div class="flex h-full max-w-4xl items-center justify-center gap-4">
    <ToastRegion :queue="notificationQueue" placement="bottom" />
    <ToastRegion :queue="errorQueue" placement="bottom start" />
    <ToastRegion :queue="successQueue" placement="bottom end" />
    <div class="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="secondary" @click="pushNotification">Notification (max 2)</Button>
      <Button size="sm" variant="secondary" @click="pushError">Error (max 3)</Button>
      <Button size="sm" variant="secondary" @click="pushSuccess">Success (max 1)</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, ToastQueue } from '@rysinal/heroui-vue'
import ToastRegion from './toast-region.vue'

// Separate queues keep each region's toasts independent.
const notificationQueue = new ToastQueue({ maxVisibleToasts: 2 })
const errorQueue = new ToastQueue({ maxVisibleToasts: 3 })
const successQueue = new ToastQueue({ maxVisibleToasts: 1 })

const pushNotification = () =>
  notificationQueue.add({ description: 'You have a new message', title: 'New notification' })

const pushError = () =>
  errorQueue.add({ description: 'Please try again', title: 'Request failed', variant: 'danger' })

const pushSuccess = () =>
  successQueue.add({ description: 'Your changes are live', title: 'Saved', variant: 'success' })
</script>
