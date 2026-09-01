<template>
  <div class="flex items-center gap-4">
    <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>K</Kbd.Content></Kbd>
    <Kbd><Kbd.Abbr key-value="shift" /><Kbd.Content>P</Kbd.Content></Kbd>
    <Kbd><Kbd.Abbr key-value="ctrl" /><Kbd.Content>C</Kbd.Content></Kbd>
    <Kbd><Kbd.Abbr key-value="option" /><Kbd.Content>D</Kbd.Content></Kbd>
  </div>
</template>

<script setup lang="ts">
import { Kbd } from '@rysinal/heroui-vue'
</script>
