<template>
  <ColorSwatchPicker default-value="#8B5CF6">
    <ColorSwatchPicker.Item v-for="color in swatchColors" :key="color" :color="color">
      <ColorSwatchPicker.Swatch />
      <ColorSwatchPicker.Indicator />
    </ColorSwatchPicker.Item>
  </ColorSwatchPicker>
</template>

<script setup lang="ts">
import { ColorSwatchPicker } from '@rysinal/heroui-vue'
import { swatchColors } from './color-data'
</script>
