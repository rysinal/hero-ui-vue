<template>
  <div class="flex items-center gap-4">
    <Tooltip :delay="0">
      <Button variant="secondary">Hover me</Button>
      <Tooltip.Content>
        <p>This is a tooltip</p>
      </Tooltip.Content>
    </Tooltip>
    <Tooltip :delay="0">
      <Button aria-label="More information" is-icon-only variant="tertiary">
        <InfoIcon />
      </Button>
      <Tooltip.Content>
        <p>Helpful information</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { Button, Tooltip } from '@rysinal/heroui-vue'
import InfoIcon from './tooltip-info-icon.vue'
</script>
