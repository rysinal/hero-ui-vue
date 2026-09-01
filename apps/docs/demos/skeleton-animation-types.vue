<template>
  <div class="grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="type in types" :key="type.value" class="space-y-2">
      <p class="truncate text-xs text-muted">{{ type.label }}</p>
      <div class="space-y-3 rounded-lg bg-transparent p-4 shadow-panel">
        <Skeleton :animation-type="type.value" class="h-20 rounded-lg" />
        <Skeleton :animation-type="type.value" class="h-3 w-3/5 rounded-lg" />
        <Skeleton :animation-type="type.value" class="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@rysinal/heroui-vue'

const types = [
  { label: 'Shimmer', value: 'shimmer' },
  { label: 'Pulse', value: 'pulse' },
  { label: 'None', value: 'none' },
] as const
</script>
