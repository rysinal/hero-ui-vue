<template>
  <div class="flex flex-col gap-3">
    <Link href="#">
      External link
      <Link.Icon class="ml-1.5 size-3">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
          <path d="M21 14v7H3V3h7" />
        </svg>
      </Link.Icon>
    </Link>
    <Link class="gap-1" href="#">
      Go to page
      <Link.Icon class="size-3">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </svg>
      </Link.Icon>
    </Link>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@rysinal/heroui-vue'
</script>
