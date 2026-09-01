<template>
  <div class="flex w-[280px] flex-col gap-3">
    <ColorField v-for="channel in channels" :key="channel" v-model="color" :channel="channel">
      <Label class="capitalize">{{ channel }}</Label>
      <ColorField.Group>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
    <div class="flex items-center gap-2">
      <ColorSwatch v-if="color" :color="color" size="sm" />
      <p class="text-sm text-muted">{{ color?.toString('rgb') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  ColorField,
  ColorSwatch,
  Label,
  parseColor,
  type Color,
  type ColorChannel,
} from '@rysinal/heroui-vue'

const color = shallowRef<Color | null>(parseColor('rgb(4, 133, 247)'))
const channels: ColorChannel[] = ['red', 'green', 'blue']
</script>
