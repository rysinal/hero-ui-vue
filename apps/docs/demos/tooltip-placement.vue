<template>
  <div class="grid grid-cols-3 gap-4">
    <div />
    <Tooltip :delay="0">
      <Button class="w-full" variant="tertiary">Top</Button>
      <Tooltip.Content placement="top" show-arrow>
        <Tooltip.Arrow />
        <p>Top placement</p>
      </Tooltip.Content>
    </Tooltip>
    <div />
    <Tooltip :delay="0">
      <Button class="w-full" variant="tertiary">Left</Button>
      <Tooltip.Content placement="left" show-arrow>
        <Tooltip.Arrow />
        <p>Left placement</p>
      </Tooltip.Content>
    </Tooltip>
    <div />
    <Tooltip :delay="0">
      <Button class="w-full" variant="tertiary">Right</Button>
      <Tooltip.Content placement="right" show-arrow>
        <Tooltip.Arrow />
        <p>Right placement</p>
      </Tooltip.Content>
    </Tooltip>
    <div />
    <Tooltip :delay="0">
      <Button class="w-full" variant="tertiary">Bottom</Button>
      <Tooltip.Content placement="bottom" show-arrow>
        <Tooltip.Arrow />
        <p>Bottom placement</p>
      </Tooltip.Content>
    </Tooltip>
    <div />
  </div>
</template>

<script setup lang="ts">
import { Button, Tooltip } from '@rysinal/heroui-vue'
</script>
