<template>
  <div class="w-full sm:max-w-sm">
    <div class="mb-8 w-full">
      <h4 class="mb-2 text-sm font-semibold">Vertical</h4>
      <ScrollShadow class="max-h-[200px]">
        <div class="flex flex-col gap-2 p-2">
          <img
            v-for="i in 6"
            :key="i"
            :src="images[(i - 1) % images.length]"
            :alt="`Sample ${i}`"
            class="h-32 w-full rounded-xl object-cover"
          />
        </div>
      </ScrollShadow>
    </div>
    <div class="w-full">
      <h4 class="mb-2 text-sm font-semibold">Horizontal</h4>
      <ScrollShadow orientation="horizontal">
        <div class="flex gap-2 p-2">
          <img
            v-for="i in 6"
            :key="i"
            :src="images[(i - 1) % images.length]"
            :alt="`Sample ${i}`"
            class="size-32 shrink-0 rounded-xl object-cover"
          />
        </div>
      </ScrollShadow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScrollShadow } from '@rysinal/heroui-vue'

const images = [
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg',
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg',
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg',
]
</script>
