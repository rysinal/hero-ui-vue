<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-3">
      <ToggleButton size="sm">
        <HeartIcon />
        Small
      </ToggleButton>
      <ToggleButton size="md">
        <HeartIcon />
        Medium
      </ToggleButton>
      <ToggleButton size="lg">
        <HeartIcon />
        Large
      </ToggleButton>
    </div>
    <div class="flex items-center gap-3">
      <ToggleButton is-icon-only aria-label="Like" size="sm">
        <HeartIcon />
      </ToggleButton>
      <ToggleButton is-icon-only aria-label="Like" size="md">
        <HeartIcon />
      </ToggleButton>
      <ToggleButton is-icon-only aria-label="Like" size="lg">
        <HeartIcon />
      </ToggleButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToggleButton } from '@rysinal/heroui-vue'
import HeartIcon from './toggle-button-heart-icon.vue'
</script>
