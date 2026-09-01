<template>
  <div class="flex h-full max-w-xl flex-col items-center justify-center">
    <div class="flex w-full flex-wrap items-center justify-center gap-4">
      <Button size="sm" variant="secondary" @click="showUpload">Upload (resolves)</Button>
      <Button size="sm" variant="secondary" @click="showFailure">Create (rejects)</Button>
      <Button size="sm" variant="secondary" @click="showRandom">Save (either)</Button>
    </div>
    <ToastRegion />
  </div>
</template>

<script setup lang="ts">
import { Button, toast } from '@rysinal/heroui-vue'
import ToastRegion from './toast-region.vue'

const uploadFile = () =>
  new Promise<{ filename: string }>((resolve) => {
    setTimeout(() => resolve({ filename: 'document.pdf' }), 2000)
  })

const createEvent = () =>
  new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Network error. Please try again.')), 2000)
  })

const saveData = () =>
  new Promise<{ count: number }>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve({ count: 42 })
      else reject(new Error('Failed to save data'))
    }, 2000)
  })

const showUpload = () =>
  toast.promise(uploadFile(), {
    error: 'Upload failed',
    loading: 'Uploading file...',
    success: (data) => `Uploaded ${data.filename}`,
  })

const showFailure = () =>
  toast.promise(createEvent(), {
    error: (error) => error.message,
    loading: 'Creating event...',
    success: 'Event created',
  })

const showRandom = () =>
  toast.promise(saveData(), {
    error: (error) => error.message,
    loading: 'Saving...',
    success: (data) => `Saved ${data.count} records`,
  })
</script>
