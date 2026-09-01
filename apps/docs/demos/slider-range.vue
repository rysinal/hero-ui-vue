<template>
  <Slider
    class="w-full max-w-xs"
    :default-value="[100, 500]"
    :format-options="{ currency: 'USD', style: 'currency' }"
    :max-value="1000"
    :min-value="0"
    :step="50"
  >
    <Label>Price Range</Label>
    <Slider.Output />
    <Slider.Track v-slot="{ values }">
      <Slider.Fill />
      <Slider.Thumb v-for="(_, index) in values" :key="index" />
    </Slider.Track>
  </Slider>
</template>

<script setup lang="ts">
import { Label, Slider } from '@rysinal/heroui-vue'
</script>
