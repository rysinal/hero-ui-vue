<template>
  <div class="flex w-64 flex-col gap-6">
    <ProgressBar color="success" size="sm" :value="40">
      <Label>Small</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <ProgressBar color="accent" size="md" :value="60">
      <Label>Medium</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <ProgressBar color="warning" size="lg" :value="80">
      <Label>Large</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  </div>
</template>

<script setup lang="ts">
import { Label, ProgressBar } from '@rysinal/heroui-vue'
</script>
