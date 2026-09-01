<template>
  <div class="flex items-end gap-6">
    <ProgressCircle aria-label="Thin circle" :value="60">
      <ProgressCircle.Track view-box="0 0 36 36">
        <ProgressCircle.TrackCircle :cx="18" :cy="18" :r="17" :stroke-width="2" />
        <ProgressCircle.FillCircle :cx="18" :cy="18" :r="17" :stroke-width="2" />
      </ProgressCircle.Track>
    </ProgressCircle>
    <ProgressCircle aria-label="Default circle" :value="60">
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
