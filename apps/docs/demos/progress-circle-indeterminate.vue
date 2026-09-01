<template>
  <ProgressCircle aria-label="Loading" is-indeterminate>
    <ProgressCircle.Track>
      <ProgressCircle.TrackCircle />
      <ProgressCircle.FillCircle />
    </ProgressCircle.Track>
  </ProgressCircle>
</template>

<script setup lang="ts">
import { ProgressCircle } from '@rysinal/heroui-vue'
</script>
