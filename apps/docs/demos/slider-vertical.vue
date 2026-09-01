<template>
  <div class="flex h-64 items-center justify-center">
    <Slider class="h-full" :default-value="30" orientation="vertical">
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  </div>
</template>

<script setup lang="ts">
import { Label, Slider } from '@rysinal/heroui-vue'
</script>
