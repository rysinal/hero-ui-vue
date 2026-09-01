<template>
  <Switch v-slot="{ isSelected }">
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Content>
      <Label class="text-sm">{{ isSelected ? 'Enabled' : 'Disabled' }}</Label>
    </Switch.Content>
  </Switch>
</template>

<script setup lang="ts">
import { Label, Switch } from '@rysinal/heroui-vue'
</script>
