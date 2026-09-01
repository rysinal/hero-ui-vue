<template>
  <ColorPicker v-model="color">
    <ColorPicker.Trigger>
      <ColorSwatch :color="color" size="lg" />
      <Label>Pick a color</Label>
    </ColorPicker.Trigger>
    <ColorPicker.Popover class="flex w-[240px] flex-col gap-3 p-3">
      <ColorArea v-model="color" class="max-w-full">
        <ColorArea.Thumb />
      </ColorArea>
      <ColorSwatchPicker v-model="swatch">
        <ColorSwatchPicker.Item v-for="preset in swatchColors" :key="preset" :color="preset">
          <ColorSwatchPicker.Swatch />
          <ColorSwatchPicker.Indicator />
        </ColorSwatchPicker.Item>
      </ColorSwatchPicker>
    </ColorPicker.Popover>
  </ColorPicker>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import {
  ColorArea,
  ColorPicker,
  ColorSwatch,
  ColorSwatchPicker,
  Label,
  parseColor,
  type Color,
} from '@rysinal/heroui-vue'
import { swatchColors } from './color-data'

const color = shallowRef<Color>(parseColor('#0485F7'))

// Choosing a preset drives the same colour the area edits.
const swatch = computed({
  get: () => color.value,
  set: (next: Color | null) => {
    if (next) color.value = next
  },
})
</script>
