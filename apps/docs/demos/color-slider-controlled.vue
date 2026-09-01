<template>
  <div class="flex w-full max-w-xs flex-col gap-4">
    <ColorSlider v-model="color" channel="hue">
      <Label>Hue</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
    <div class="flex items-center gap-2">
      <ColorSwatch :color="color" size="sm" />
      <p class="text-sm text-muted">{{ color.toString('hsl') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorSlider, ColorSwatch, Label, parseColor, type Color } from '@rysinal/heroui-vue'

const color = shallowRef<Color>(parseColor('hsl(200, 100%, 50%)'))
</script>
