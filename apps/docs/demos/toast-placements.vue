<template>
  <div class="flex h-full flex-col items-center justify-center gap-6">
    <ToastRegion v-for="p in placements" :key="p" :placement="p" :queue="queues[p]" />
    <div class="grid grid-cols-3 gap-3">
      <Button v-for="p in placements" :key="p" size="sm" variant="secondary" @click="show(p)">
        {{ p }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, ToastQueue, type ToastPlacement } from '@rysinal/heroui-vue'
import ToastRegion from './toast-region.vue'

const placements: ToastPlacement[] = [
  'top start',
  'top',
  'top end',
  'bottom start',
  'bottom',
  'bottom end',
]

// Each placement needs its own queue so the regions stay independent.
const queues = Object.fromEntries(
  placements.map((p) => [p, new ToastQueue({ maxVisibleToasts: 3 })]),
) as Record<ToastPlacement, ToastQueue>

const show = (placement: ToastPlacement) => {
  queues[placement].add({
    description: 'Event has been created',
    title: 'Event created',
    variant: 'default',
  })
}
</script>
