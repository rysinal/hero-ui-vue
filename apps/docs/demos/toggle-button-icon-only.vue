<template>
  <div class="flex items-center gap-3">
    <ToggleButton is-icon-only aria-label="Like">
      <HeartIcon />
    </ToggleButton>
    <ToggleButton is-icon-only aria-label="Bookmark" variant="ghost">
      <HeartIcon name="bookmark" />
    </ToggleButton>
  </div>
</template>

<script setup lang="ts">
import { ToggleButton } from '@rysinal/heroui-vue'
import HeartIcon from './toggle-button-heart-icon.vue'
</script>
