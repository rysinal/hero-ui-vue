<template>
  <ColorPicker v-slot="{ value }" v-model="color" default-value="#0485F7">
    <ColorPicker.Trigger>
      <ColorSwatch :color="value ?? color" size="lg" />
      <Label>Pick a color</Label>
    </ColorPicker.Trigger>
    <ColorPicker.Popover class="flex w-[240px] flex-col gap-3 p-3">
      <ColorArea v-model="color" class="max-w-full">
        <ColorArea.Thumb />
      </ColorArea>
      <ColorSlider v-model="color" channel="hue">
        <Label>Hue</Label>
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
  ColorArea,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Label,
  parseColor,
  type Color,
} from '@rysinal/heroui-vue'

const color = shallowRef<Color>(parseColor('#0485F7'))
</script>
