<template>
  <Switch as="label" data-custom="foo">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Label class="text-sm">Enable notifications</Label>
  </Switch>
</template>

<script setup lang="ts">
import { Label, Switch } from '@rysinal/heroui-vue'
</script>
