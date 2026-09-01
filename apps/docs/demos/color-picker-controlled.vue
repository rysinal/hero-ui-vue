<template>
  <div class="flex flex-col gap-3">
    <ColorPicker v-model="color">
      <ColorPicker.Trigger>
        <ColorSwatch :color="color" size="lg" />
        <Label>Pick a color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover class="flex w-[240px] flex-col gap-3 p-3">
        <ColorArea v-model="color" class="max-w-full">
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider v-model="color" channel="hue">
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </ColorPicker.Popover>
    </ColorPicker>
    <p class="text-sm text-muted">Value: {{ color.toString('hex') }}</p>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  ColorArea,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Label,
  parseColor,
  type Color,
} from '@rysinal/heroui-vue'

const color = shallowRef<Color>(parseColor('#8B5CF6'))
</script>
