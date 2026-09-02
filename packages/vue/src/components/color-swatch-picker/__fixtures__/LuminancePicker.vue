<script setup lang="ts">
import { ColorSwatchPicker } from '../index'

// White is light, navy is dark, so the indicator has to switch the checkmark
// colour between them.
const colors = ['#FFFFFF', '#1E1B4B']

const props = defineProps<{ selected?: string }>()
</script>

<template>
  <ColorSwatchPicker :default-value="props.selected ?? '#FFFFFF'">
    <ColorSwatchPicker.Item v-for="color in colors" :key="color" :color="color">
      <ColorSwatchPicker.Swatch />
      <ColorSwatchPicker.Indicator />
    </ColorSwatchPicker.Item>
  </ColorSwatchPicker>
</template>
