<template>
  <div class="flex flex-col gap-4">
    <ColorSwatchPicker default-value="#8B5CF6" is-disabled>
      <ColorSwatchPicker.Item v-for="color in swatchColors.slice(0, 4)" :key="color" :color="color">
        <ColorSwatchPicker.Swatch />
        <ColorSwatchPicker.Indicator />
      </ColorSwatchPicker.Item>
    </ColorSwatchPicker>
    <ColorSwatchPicker default-value="#8B5CF6">
      <ColorSwatchPicker.Item
        v-for="(color, index) in swatchColors.slice(0, 4)"
        :key="color"
        :color="color"
        :is-disabled="index === 1"
      >
        <ColorSwatchPicker.Swatch />
        <ColorSwatchPicker.Indicator />
      </ColorSwatchPicker.Item>
    </ColorSwatchPicker>
  </div>
</template>

<script setup lang="ts">
import { ColorSwatchPicker } from '@rysinal/heroui-vue'
import { swatchColors } from './color-data'
</script>
