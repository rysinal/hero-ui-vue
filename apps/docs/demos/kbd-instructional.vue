<template>
  <div class="space-y-3">
    <div class="rounded-lg bg-surface p-4">
      <h4 class="mb-2 text-sm font-semibold">Quick Actions</h4>
      <ul class="space-y-2 text-sm">
        <li>
          • Open search:
          <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>K</Kbd.Content></Kbd>
        </li>
        <li>
          • Toggle sidebar:
          <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>B</Kbd.Content></Kbd>
        </li>
        <li>
          • Save changes:
          <Kbd><Kbd.Abbr key-value="command" /><Kbd.Content>S</Kbd.Content></Kbd>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Kbd } from '@rysinal/heroui-vue'
</script>
