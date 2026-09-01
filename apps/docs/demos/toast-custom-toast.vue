<template>
  <div class="flex h-full max-w-xl flex-col items-center justify-center">
    <Button size="sm" variant="secondary" @click="show">Custom toast</Button>
    <Toast.Provider :queue="customQueue" placement="bottom">
      <div class="flex w-full items-start gap-3 rounded-xl border border-default p-1">
        <Toast.Indicator />
        <Toast.Content>
          <Toast.Title class="font-semibold" />
          <Toast.Description class="text-muted" />
        </Toast.Content>
        <Toast.CloseButton />
      </div>
    </Toast.Provider>
  </div>
</template>

<script setup lang="ts">
import { Button, Toast, ToastQueue } from '@rysinal/heroui-vue'

const customQueue = new ToastQueue()

const show = () =>
  customQueue.add({
    description: 'Rendered with fully custom markup',
    title: 'Custom layout',
    variant: 'accent',
  })
</script>
