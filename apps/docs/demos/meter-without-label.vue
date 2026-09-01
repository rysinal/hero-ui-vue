<template>
  <Meter aria-label="Storage usage" class="w-64" :value="45">
    <Meter.Track>
      <Meter.Fill />
    </Meter.Track>
  </Meter>
</template>

<script setup lang="ts">
import { Meter } from '@rysinal/heroui-vue'
</script>
