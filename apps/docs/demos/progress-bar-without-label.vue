<template>
  <ProgressBar aria-label="Storage usage" class="w-64" :value="45">
    <ProgressBar.Track>
      <ProgressBar.Fill />
    </ProgressBar.Track>
  </ProgressBar>
</template>

<script setup lang="ts">
import { ProgressBar } from '@rysinal/heroui-vue'
</script>
