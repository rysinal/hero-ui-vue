<template>
  <div class="flex h-full max-w-xl flex-col items-center justify-center">
    <div class="flex w-full flex-wrap items-center justify-center gap-4">
      <Button
        v-for="entry in entries"
        :key="entry.variant"
        size="sm"
        variant="tertiary"
        @click="show(entry)"
      >
        {{ entry.label }}
      </Button>
    </div>
    <ToastRegion />
  </div>
</template>

<script setup lang="ts">
import { Button, toast, type ToastVariant } from '@rysinal/heroui-vue'
import ToastRegion from './toast-region.vue'

const entries: Array<{ label: string; variant: ToastVariant; title: string; description: string }> = [
  { description: 'Bob sent you an invitation', label: 'Default', title: 'Team invitation', variant: 'default' },
  { description: 'Your changes are live', label: 'Accent', title: 'Deployed', variant: 'accent' },
  { description: 'Your changes have been saved', label: 'Success', title: 'Saved', variant: 'success' },
  { description: 'Your plan expires soon', label: 'Warning', title: 'Heads up', variant: 'warning' },
  { description: 'We could not save your changes', label: 'Danger', title: 'Failed', variant: 'danger' },
]

const show = (entry: (typeof entries)[number]) => {
  toast(entry.title, {
    action: { label: 'Dismiss', onPress: () => toast.clear() },
    description: entry.description,
    variant: entry.variant,
  })
}
</script>
