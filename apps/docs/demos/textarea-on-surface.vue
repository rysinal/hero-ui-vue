<template>
  <Surface class="flex w-[320px] items-center justify-center rounded-3xl p-4">
    <Textarea class="w-full" placeholder="Leave a note" :rows="4" variant="secondary" />
  </Surface>
</template>

<script setup lang="ts">
import { Surface, Textarea } from '@rysinal/heroui-vue'
</script>
