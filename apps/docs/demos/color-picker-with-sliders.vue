<template>
  <ColorPicker v-model="color">
    <ColorPicker.Trigger>
      <ColorSwatch :color="color" size="lg" />
      <Label>Pick a color</Label>
    </ColorPicker.Trigger>
    <ColorPicker.Popover class="flex w-[260px] flex-col gap-3 p-3">
      <ColorSlider v-for="channel in channels" :key="channel" v-model="color" :channel="channel">
        <Label class="capitalize">{{ channel }}</Label>
        <ColorSlider.Output class="text-muted" />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    </ColorPicker.Popover>
  </ColorPicker>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Label,
  parseColor,
  type Color,
  type ColorChannel,
} from '@rysinal/heroui-vue'

const color = shallowRef<Color>(parseColor('hsl(220, 100%, 50%)'))
const channels: ColorChannel[] = ['hue', 'saturation', 'lightness']
</script>
