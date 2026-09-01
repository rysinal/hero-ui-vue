<template>
  <div class="flex flex-col gap-4">
    <Surface v-for="variant in variants" :key="variant" :variant="variant" class="rounded-2xl p-4">
      <p class="text-sm font-medium capitalize">{{ variant }} surface</p>
    </Surface>
  </div>
</template>

<script setup lang="ts">
import { Surface } from '@rysinal/heroui-vue'

const variants = ['default', 'secondary', 'tertiary', 'transparent'] as const
</script>
