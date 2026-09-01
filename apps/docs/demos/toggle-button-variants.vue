<template>
  <div class="flex items-center gap-3">
    <ToggleButton>
      <HeartIcon />
      Default
    </ToggleButton>
    <ToggleButton variant="ghost">
      <HeartIcon />
      Ghost
    </ToggleButton>
  </div>
</template>

<script setup lang="ts">
import { ToggleButton } from '@rysinal/heroui-vue'
import HeartIcon from './toggle-button-heart-icon.vue'
</script>
