<template>
  <div
    class="skeleton--shimmer relative grid w-full max-w-xl grid-cols-3 gap-4 overflow-hidden rounded-xl"
  >
    <Skeleton v-for="i in 3" :key="i" animation-type="none" class="h-24 rounded-xl" />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@rysinal/heroui-vue'
</script>
