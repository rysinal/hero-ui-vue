<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium text-muted">Underline on hover</p>
      <Link class="hover:underline" href="#">
        Hover to see underline animation
        <Link.Icon />
      </Link>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium text-muted">Always visible underline</p>
      <Link class="underline" href="#">
        Underline always visible
        <Link.Icon />
      </Link>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium text-muted">No underline</p>
      <Link class="no-underline" href="#">
        Never underlined
        <Link.Icon />
      </Link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@rysinal/heroui-vue'
</script>
