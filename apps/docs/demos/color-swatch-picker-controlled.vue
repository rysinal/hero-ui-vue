<template>
  <div class="flex flex-col gap-3">
    <ColorSwatchPicker v-model="selected">
      <ColorSwatchPicker.Item v-for="color in swatchColors" :key="color" :color="color">
        <ColorSwatchPicker.Swatch />
        <ColorSwatchPicker.Indicator />
      </ColorSwatchPicker.Item>
    </ColorSwatchPicker>
    <p class="text-sm text-muted">Selected: {{ selected?.toString('hex') ?? 'none' }}</p>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorSwatchPicker, parseColor, type Color } from '@rysinal/heroui-vue'
import { swatchColors } from './color-data'

const selected = shallowRef<Color | null>(parseColor('#3B82F6'))
</script>
