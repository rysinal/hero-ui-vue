<template>
  <div class="space-y-3">
    <p class="text-sm">
      Press
      <Kbd><Kbd.Abbr key-value="enter" /></Kbd>
      to confirm or
      <Kbd><Kbd.Abbr key-value="escape" /></Kbd>
      to cancel.
    </p>
    <p class="text-sm">
      Use
      <Kbd><Kbd.Abbr key-value="tab" /></Kbd>
      to move forward and
      <Kbd><Kbd.Abbr key-value="shift" /><Kbd.Abbr key-value="tab" /></Kbd>
      to move back.
    </p>
    <p class="text-sm">
      <Kbd><Kbd.Abbr key-value="delete" /></Kbd>
      removes the selection, and
      <Kbd><Kbd.Abbr key-value="space" /></Kbd>
      toggles it.
    </p>
  </div>
</template>

<script setup lang="ts">
import { Kbd } from '@rysinal/heroui-vue'
</script>
