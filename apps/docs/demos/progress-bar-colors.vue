<template>
  <div class="flex w-64 flex-col gap-6">
    <ProgressBar color="default" :value="50">
      <Label>Default</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <ProgressBar color="accent" :value="50">
      <Label>Accent</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <ProgressBar color="success" :value="50">
      <Label>Success</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <ProgressBar color="warning" :value="50">
      <Label>Warning</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <ProgressBar color="danger" :value="50">
      <Label>Danger</Label>
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
