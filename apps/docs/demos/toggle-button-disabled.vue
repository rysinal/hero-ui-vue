<template>
  <div class="flex items-center gap-3">
    <ToggleButton is-disabled>
      <HeartIcon />
      Like
    </ToggleButton>
    <ToggleButton default-selected is-disabled>
      <HeartIcon filled />
      Like
    </ToggleButton>
  </div>
</template>

<script setup lang="ts">
import { ToggleButton } from '@rysinal/heroui-vue'
import HeartIcon from './toggle-button-heart-icon.vue'
</script>
