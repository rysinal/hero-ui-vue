<template>
  <div class="flex flex-col gap-4">
    <Link class="underline underline-offset-2" href="#">
      Underlined with offset
      <Link.Icon />
    </Link>
    <Link class="decoration-dotted underline underline-offset-4" href="#">
      Dotted underline
      <Link.Icon />
    </Link>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@rysinal/heroui-vue'
</script>
