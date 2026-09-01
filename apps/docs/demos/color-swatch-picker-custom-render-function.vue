<template>
  <ColorSwatchPicker default-value="#8B5CF6">
    <ColorSwatchPicker.Item
      v-for="color in swatchColors.slice(0, 4)"
      v-slot="{ isSelected }"
      :key="color"
      :color="color"
    >
      <ColorSwatchPicker.Swatch />
      <span class="sr-only">{{ isSelected ? `${color} selected` : color }}</span>
      <ColorSwatchPicker.Indicator />
    </ColorSwatchPicker.Item>
  </ColorSwatchPicker>
</template>

<script setup lang="ts">
import { ColorSwatchPicker } from '@rysinal/heroui-vue'
import { swatchColors } from './color-data'
</script>
