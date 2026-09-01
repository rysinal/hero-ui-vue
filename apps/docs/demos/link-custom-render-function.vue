<template>
  <div class="flex flex-col gap-3">
    <Link as="button" type="button">
      Rendered as a button
      <Link.Icon />
    </Link>
    <Link href="#" is-current>
      Current page
    </Link>
    <Link href="#" is-disabled>
      Disabled link
    </Link>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@rysinal/heroui-vue'
</script>
