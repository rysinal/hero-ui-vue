<script setup lang="ts">
import { Button } from '../../button'
import { Tooltip } from '../index'
</script>

<template>
  <Tooltip :delay="0" default-open>
    <Tooltip.Trigger>
      <Button variant="secondary">Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      Tooltip content
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip>
</template>
