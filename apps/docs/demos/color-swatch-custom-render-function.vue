<template>
  <div class="flex items-center gap-3">
    <ColorSwatch v-for="color in swatchColors.slice(0, 3)" :key="color" :color="color" size="lg">
      <span class="sr-only">{{ color }}</span>
    </ColorSwatch>
  </div>
</template>

<script setup lang="ts">
import { ColorSwatch } from '@rysinal/heroui-vue'
import { swatchColors } from './color-data'
</script>
