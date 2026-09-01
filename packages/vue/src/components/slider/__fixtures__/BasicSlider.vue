<script setup lang="ts">
import { Slider } from '../index'
</script>

<template>
  <Slider :default-value="40" aria-label="Volume">
    <Slider.Output />
    <Slider.Track>
      <Slider.Fill />
      <Slider.Thumb />
    </Slider.Track>
  </Slider>
</template>
