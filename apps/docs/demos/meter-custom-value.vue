<template>
  <Meter
    class="w-64"
    :format-options="{ currency: 'USD', style: 'currency' }"
    :max-value="1000"
    :min-value="0"
    :value="750"
  >
    <Label>Revenue</Label>
    <Meter.Output />
    <Meter.Track>
      <Meter.Fill />
    </Meter.Track>
  </Meter>
</template>

<script setup lang="ts">
import { Label, Meter } from '@rysinal/heroui-vue'
</script>
