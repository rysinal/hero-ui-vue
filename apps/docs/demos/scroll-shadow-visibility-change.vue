<template>
  <div class="w-full sm:max-w-sm">
    <div class="mb-8 flex flex-col gap-2">
      <p class="text-sm text-muted">
        Vertical visibility: <span class="font-medium">{{ verticalState }}</span>
      </p>
      <ScrollShadow class="max-h-[200px]" @visibility-change="verticalState = $event">
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
    <div class="flex flex-col gap-2">
      <p class="text-sm text-muted">
        Horizontal visibility: <span class="font-medium">{{ horizontalState }}</span>
      </p>
      <ScrollShadow orientation="horizontal" @visibility-change="horizontalState = $event">
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
import { ref } from 'vue'
import { ScrollShadow } from '@rysinal/heroui-vue'

const verticalState = ref('none')
const horizontalState = ref('none')

const images = [
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg',
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg',
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg',
]
</script>
