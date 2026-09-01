<template>
  <div class="flex items-center gap-3">
    <ProgressCircle aria-label="Loading" :value="75">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
    <Label>75% Complete</Label>
  </div>
</template>

<script setup lang="ts">
import { Label, ProgressCircle } from '@rysinal/heroui-vue'
</script>
