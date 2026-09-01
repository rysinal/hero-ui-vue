<script setup lang="ts">
import { Slider } from '../index'
</script>

<template>
  <Slider :default-value="[20, 60]" aria-label="Price range">
    <Slider.Output />
    <Slider.Track>
      <Slider.Fill />
      <Slider.Thumb />
      <Slider.Thumb />
    </Slider.Track>
  </Slider>
</template>
