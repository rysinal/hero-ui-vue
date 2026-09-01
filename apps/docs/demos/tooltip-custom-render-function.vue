<template>
  <div class="flex items-center gap-4">
    <Tooltip :delay="0">
      <Button variant="secondary">Hover me</Button>
      <Tooltip.Content data-custom="foo">
        <p>This tooltip carries a custom attribute</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { Button, Tooltip } from '@rysinal/heroui-vue'
</script>
