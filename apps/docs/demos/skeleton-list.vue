<template>
  <div class="w-full max-w-sm space-y-4">
    <div v-for="i in 3" :key="i" class="flex items-center gap-3">
      <Skeleton class="h-10 w-10 shrink-0 rounded-lg" />
      <div class="flex-1 space-y-2">
        <Skeleton class="h-3 w-full rounded" />
        <Skeleton class="h-3 w-4/5 rounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@rysinal/heroui-vue'
</script>
