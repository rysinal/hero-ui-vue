<template>
  <div class="flex h-full max-w-xl flex-col items-center justify-center">
    <Button size="sm" variant="secondary" @click="show">Show toast</Button>
    <ToastRegion />
  </div>
</template>

<script setup lang="ts">
import { Button, toast } from '@rysinal/heroui-vue'
import ToastRegion from './toast-region.vue'

const show = () => {
  toast('You have been invited to join a team', {
    action: { label: 'Dismiss', onPress: () => toast.clear() },
    description: 'Bob sent you an invitation to join HeroUI team',
  })
}
</script>
