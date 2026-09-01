<template>
  <ProgressBar aria-label="Loading" class="w-64" is-indeterminate>
    <Label>Loading...</Label>
    <ProgressBar.Track>
      <ProgressBar.Fill />
    </ProgressBar.Track>
  </ProgressBar>
</template>

<script setup lang="ts">
import { Label, ProgressBar } from '@rysinal/heroui-vue'
</script>
