<script setup lang="ts">
import { Label } from '../../label'
import { ColorSlider } from '../index'
</script>

<template>
  <ColorSlider channel="hue" default-value="hsl(0, 100%, 50%)">
    <Label>Hue</Label>
    <ColorSlider.Output />
    <ColorSlider.Track>
      <ColorSlider.Thumb />
    </ColorSlider.Track>
  </ColorSlider>
</template>
