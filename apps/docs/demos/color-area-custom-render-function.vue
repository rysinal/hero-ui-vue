<template>
  <ColorArea v-slot="{ value }" default-value="rgb(116, 52, 255)">
    <ColorArea.Thumb />
    <span class="sr-only">{{ value.toString('hex') }}</span>
  </ColorArea>
</template>

<script setup lang="ts">
import { ColorArea } from '@rysinal/heroui-vue'
</script>
