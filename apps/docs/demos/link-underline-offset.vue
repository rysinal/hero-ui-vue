<template>
  <div class="flex flex-col gap-4">
    <Link class="underline-offset-1 hover:underline" href="#">
      Offset 1
      <Link.Icon />
    </Link>
    <Link class="underline-offset-2 hover:underline" href="#">
      Offset 2
      <Link.Icon />
    </Link>
    <Link class="underline-offset-4 hover:underline" href="#">
      Offset 4
      <Link.Icon />
    </Link>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@rysinal/heroui-vue'
</script>
