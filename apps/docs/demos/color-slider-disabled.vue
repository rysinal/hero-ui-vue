<template>
  <ColorSlider channel="hue" class="w-full max-w-xs" default-value="hsl(200, 100%, 50%)" is-disabled>
    <Label>Hue</Label>
    <ColorSlider.Output />
    <ColorSlider.Track>
      <ColorSlider.Thumb />
    </ColorSlider.Track>
  </ColorSlider>
</template>

<script setup lang="ts">
import { ColorSlider, Label } from '@rysinal/heroui-vue'
</script>
