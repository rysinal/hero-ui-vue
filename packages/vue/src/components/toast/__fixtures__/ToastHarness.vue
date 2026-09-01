<script setup lang="ts">
import { Toast, ToastQueue, createToast } from '../index'

const queue = new ToastQueue()
const toast = createToast(queue)

toast('First', { timeout: 0 })
toast('Second', { timeout: 0 })
</script>

<template>
  <Toast.Provider :queue="queue">
    <Toast.Indicator />
    <Toast.Content>
      <Toast.Title />
      <Toast.Description />
    </Toast.Content>
    <Toast.CloseButton />
  </Toast.Provider>
</template>
