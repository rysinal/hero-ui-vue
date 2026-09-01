<template>
  <div class="flex h-full max-w-xl flex-col items-center justify-center">
    <Button size="sm" variant="secondary" @click="toast('Custom icon indicator')">
      Custom indicator
    </Button>
    <Toast.Provider>
      <Toast.Indicator>
        <svg class="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
        </svg>
      </Toast.Indicator>
      <Toast.Content>
        <Toast.Title />
        <Toast.Description />
      </Toast.Content>
      <Toast.CloseButton />
    </Toast.Provider>
  </div>
</template>

<script setup lang="ts">
import { Button, Toast, toast } from '@rysinal/heroui-vue'
</script>
