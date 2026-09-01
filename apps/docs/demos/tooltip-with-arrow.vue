<template>
  <div class="flex items-center gap-4">
    <Tooltip :delay="0">
      <Button variant="secondary">With Arrow</Button>
      <Tooltip.Content show-arrow>
        <Tooltip.Arrow />
        <p>Tooltip with arrow indicator</p>
      </Tooltip.Content>
    </Tooltip>
    <Tooltip :delay="0">
      <Button variant="primary">Custom Offset</Button>
      <Tooltip.Content :offset="12" show-arrow>
        <Tooltip.Arrow />
        <p>Pushed further from the trigger</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { Button, Tooltip } from '@rysinal/heroui-vue'
</script>
