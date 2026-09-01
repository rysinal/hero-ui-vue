<template>
  <Slider as="section" class="w-full max-w-xs" data-custom="foo" :default-value="30">
    <Label>Volume</Label>
    <Slider.Output />
    <Slider.Track>
      <Slider.Fill />
      <Slider.Thumb />
    </Slider.Track>
  </Slider>
</template>

<script setup lang="ts">
import { Label, Slider } from '@rysinal/heroui-vue'
</script>
