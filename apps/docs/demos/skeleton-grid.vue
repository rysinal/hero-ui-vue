<template>
  <div class="grid w-full max-w-xl grid-cols-3 gap-4">
    <Skeleton v-for="i in 3" :key="i" class="h-24 rounded-xl" />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@rysinal/heroui-vue'
</script>
