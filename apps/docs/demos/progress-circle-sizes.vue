<template>
  <div class="flex items-center gap-6">
    <ProgressCircle aria-label="Loading" size="sm" :value="40">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
    <ProgressCircle aria-label="Loading" size="md" :value="60">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
    <ProgressCircle aria-label="Loading" size="lg" :value="80">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
  </div>
</template>

<script setup lang="ts">
import { ProgressCircle } from '@rysinal/heroui-vue'
</script>
