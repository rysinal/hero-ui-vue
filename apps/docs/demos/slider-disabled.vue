<template>
  <Slider class="w-full max-w-xs" :default-value="30" is-disabled>
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
