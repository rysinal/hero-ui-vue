<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <span class="text-sm text-muted">Arrow Keys:</span>
      <div class="flex items-center gap-2">
        <Kbd><Kbd.Abbr key-value="up" /></Kbd>
        <Kbd><Kbd.Abbr key-value="down" /></Kbd>
        <Kbd><Kbd.Abbr key-value="left" /></Kbd>
        <Kbd><Kbd.Abbr key-value="right" /></Kbd>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm text-muted">Page Navigation:</span>
      <div class="flex items-center gap-2">
        <Kbd><Kbd.Abbr key-value="pageup" /></Kbd>
        <Kbd><Kbd.Abbr key-value="pagedown" /></Kbd>
        <Kbd><Kbd.Abbr key-value="home" /></Kbd>
        <Kbd><Kbd.Abbr key-value="end" /></Kbd>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Kbd } from '@rysinal/heroui-vue'
</script>
