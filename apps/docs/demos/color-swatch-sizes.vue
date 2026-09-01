<template>
  <div class="flex items-center gap-3">
    <ColorSwatch v-for="size in sizes" :key="size" :size="size" color="#0485F7" />
  </div>
</template>

<script setup lang="ts">
import { ColorSwatch } from '@rysinal/heroui-vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>
