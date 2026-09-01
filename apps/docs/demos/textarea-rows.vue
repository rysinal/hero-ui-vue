<template>
  <div class="flex w-[280px] flex-col gap-3">
    <Textarea full-width placeholder="Two rows" :rows="2" />
    <Textarea full-width placeholder="Six rows" :rows="6" />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@rysinal/heroui-vue'
</script>
