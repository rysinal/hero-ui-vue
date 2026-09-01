<script setup lang="ts">
import { ColorSwatchPicker } from '../index'

const colors = ['#F43F5E', '#8B5CF6', '#10B981']
</script>

<template>
  <ColorSwatchPicker default-value="#8B5CF6">
    <ColorSwatchPicker.Item v-for="color in colors" :key="color" :color="color">
      <ColorSwatchPicker.Swatch />
      <ColorSwatchPicker.Indicator />
    </ColorSwatchPicker.Item>
  </ColorSwatchPicker>
</template>
