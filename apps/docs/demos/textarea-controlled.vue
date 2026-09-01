<template>
  <div class="flex w-80 flex-col gap-2">
    <Textarea v-model="value" aria-label="Bio" placeholder="Tell us about yourself" :rows="4" />
    <span class="px-1 text-sm text-muted">{{ value.length }} characters</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@rysinal/heroui-vue'

const value = ref('')
</script>
