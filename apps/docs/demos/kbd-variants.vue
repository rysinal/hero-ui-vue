<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <span>Copy:</span>
      <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>C</Kbd.Content></Kbd>
      <Kbd variant="light"><Kbd.Abbr key-value="command" /><Kbd.Content>C</Kbd.Content></Kbd>
    </div>
    <div class="flex items-center gap-2">
      <span>Paste:</span>
      <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>V</Kbd.Content></Kbd>
      <Kbd variant="light"><Kbd.Abbr key-value="command" /><Kbd.Content>V</Kbd.Content></Kbd>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Kbd } from '@rysinal/heroui-vue'
</script>
