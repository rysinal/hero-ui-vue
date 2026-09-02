<script setup lang="ts">
import { Toast, ToastQueue, createToast } from '../index'

const queue = new ToastQueue()
const toast = createToast(queue)

toast('Custom', { timeout: 0 })
</script>

<template>
  <Toast.Provider :queue="queue">
    <!-- Custom children must suppress the default icon, the way React's
         `children ?? getDefaultIcon()` does. -->
    <Toast.Indicator>
      <svg data-slot="custom-icon" viewBox="0 0 16 16" />
    </Toast.Indicator>
    <Toast.Content>
      <Toast.Title />
    </Toast.Content>
  </Toast.Provider>
</template>
