<template>
  <div class="flex flex-wrap gap-6">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">saturation / brightness</span>
      <ColorArea default-value="hsb(220, 100%, 100%)" x-channel="saturation" y-channel="brightness">
        <ColorArea.Thumb />
      </ColorArea>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">saturation / lightness</span>
      <ColorArea default-value="hsl(220, 100%, 50%)" x-channel="saturation" y-channel="lightness">
        <ColorArea.Thumb />
      </ColorArea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColorArea } from '@rysinal/heroui-vue'
</script>
