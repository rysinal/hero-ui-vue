<template>
  <div class="flex w-full max-w-xs flex-col gap-4">
    <ColorSlider v-for="channel in channels" :key="channel" v-model="color" :channel="channel">
      <Label class="capitalize">{{ channel }}</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorSlider, Label, parseColor, type Color, type ColorChannel } from '@rysinal/heroui-vue'

const color = shallowRef<Color>(parseColor('rgb(116, 52, 255)'))
const channels: ColorChannel[] = ['red', 'green', 'blue']
</script>
