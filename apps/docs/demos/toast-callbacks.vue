<template>
  <div class="flex h-full max-w-2xl flex-col items-center justify-center gap-6">
    <div class="flex w-full flex-wrap items-center justify-center gap-4">
      <Button size="sm" variant="secondary" @click="showSaved">File saved</Button>
      <Button size="sm" variant="secondary" @click="showDeleted">File deleted</Button>
    </div>
    <div v-if="history.length" class="w-full max-w-sm">
      <p class="mb-2 text-sm font-medium text-muted">Closed toasts</p>
      <ul class="flex flex-col gap-1 text-sm">
        <li v-for="entry in history" :key="`${entry.time}-${entry.message}`">
          {{ entry.time }} — {{ entry.message }}
        </li>
      </ul>
    </div>
    <ToastRegion />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, toast } from '@rysinal/heroui-vue'
import ToastRegion from './toast-region.vue'

const history = ref<Array<{ message: string; time: string }>>([])

const addToHistory = (message: string) => {
  history.value = [{ message, time: new Date().toLocaleTimeString() }, ...history.value].slice(0, 5)
}

const showSaved = () => toast('File saved', { onClose: () => addToHistory('File saved') })
const showDeleted = () =>
  toast.danger('File deleted', { onClose: () => addToHistory('File deleted') })
</script>
