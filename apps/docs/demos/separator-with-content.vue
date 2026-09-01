<template>
  <div class="flex max-w-md flex-col">
    <template v-for="(item, index) in items" :key="item.title">
      <Separator v-if="index > 0" />
      <div class="flex items-center gap-3 py-3">
        <img :src="item.iconUrl" :alt="item.title" class="size-10 shrink-0" />
        <div class="flex flex-col">
          <span class="text-sm font-medium text-foreground">{{ item.title }}</span>
          <span class="text-sm text-muted">{{ item.subtitle }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@rysinal/heroui-vue'

const items = [
  {
    iconUrl: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/bell-small.png',
    subtitle: 'Receive account activity updates',
    title: 'Set Up Notifications',
  },
  {
    iconUrl: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/compass-small.png',
    subtitle: 'Connect your browser to your account',
    title: 'Set up Browser Extension',
  },
  {
    iconUrl:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/mint-collective-small.png',
    subtitle: 'Create your first collectible',
    title: 'Mint Collectible',
  },
]
</script>
