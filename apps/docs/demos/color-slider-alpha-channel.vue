<template>
  <ColorSlider channel="alpha" class="w-full max-w-xs" default-value="rgba(116, 52, 255, 1)">
    <Label>Alpha</Label>
    <ColorSlider.Output />
    <ColorSlider.Track>
      <ColorSlider.Thumb />
    </ColorSlider.Track>
  </ColorSlider>
</template>

<script setup lang="ts">
import { ColorSlider, Label } from '@rysinal/heroui-vue'
</script>
