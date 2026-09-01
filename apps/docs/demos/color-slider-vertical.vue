<template>
  <div class="flex h-56 items-start gap-6">
    <ColorSlider channel="hue" default-value="hsl(0, 100%, 50%)" orientation="vertical">
      <Label>Hue</Label>
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  </div>
</template>

<script setup lang="ts">
import { ColorSlider, Label } from '@rysinal/heroui-vue'
</script>
