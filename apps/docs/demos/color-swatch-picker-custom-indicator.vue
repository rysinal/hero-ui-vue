<template>
  <ColorSwatchPicker default-value="#8B5CF6">
    <ColorSwatchPicker.Item v-for="color in swatchColors" :key="color" :color="color">
      <ColorSwatchPicker.Swatch />
      <ColorSwatchPicker.Indicator>
        <svg fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
        </svg>
      </ColorSwatchPicker.Indicator>
    </ColorSwatchPicker.Item>
  </ColorSwatchPicker>
</template>

<script setup lang="ts">
import { ColorSwatchPicker } from '@rysinal/heroui-vue'
import { swatchColors } from './color-data'
</script>
