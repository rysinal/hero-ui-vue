<template>
  <div class="space-y-4">
    <p class="text-sm">
      Press
      <Kbd><Kbd.Content>Esc</Kbd.Content></Kbd>
      to close the dialog.
    </p>
    <p class="text-sm">
      Use
      <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>K</Kbd.Content></Kbd>
      to open the command palette.
    </p>
    <p class="text-sm">
      Save your work with
      <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>S</Kbd.Content></Kbd>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { Kbd } from '@rysinal/heroui-vue'
</script>
