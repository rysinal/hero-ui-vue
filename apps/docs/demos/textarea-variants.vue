<template>
  <div class="flex w-[280px] flex-col gap-3">
    <Textarea full-width placeholder="Primary textarea" variant="primary" />
    <Textarea full-width placeholder="Secondary textarea" variant="secondary" />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@rysinal/heroui-vue'
</script>
