<template>
  <ProgressBar
    class="w-64"
    :format-options="{ style: 'percent' }"
    :max-value="1"
    :min-value="0"
    :value="0.62"
  >
    <Label>Upload progress</Label>
    <ProgressBar.Output />
    <ProgressBar.Track>
      <ProgressBar.Fill />
    </ProgressBar.Track>
  </ProgressBar>
</template>

<script setup lang="ts">
import { Label, ProgressBar } from '@rysinal/heroui-vue'
</script>
