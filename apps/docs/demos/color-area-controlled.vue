<template>
  <div class="flex flex-col items-start gap-3">
    <ColorArea v-model="color">
      <ColorArea.Thumb />
    </ColorArea>
    <div class="flex items-center gap-2">
      <ColorSwatch :color="color" size="sm" />
      <p class="text-sm text-muted">{{ color.toString('hex') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorArea, ColorSwatch, parseColor, type Color } from '@rysinal/heroui-vue'

const color = shallowRef<Color>(parseColor('rgb(116, 52, 255)'))
</script>
