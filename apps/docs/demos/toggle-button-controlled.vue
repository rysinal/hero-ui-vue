<template>
  <div class="flex flex-col gap-4">
    <ToggleButton v-slot="{ isSelected: selected }" v-model:selected="isSelected">
      <HeartIcon :filled="selected" />
      {{ selected ? 'Liked' : 'Like' }}
    </ToggleButton>
    <p class="text-sm text-muted">
      Status: <span class="font-medium">{{ isSelected ? 'Selected' : 'Not selected' }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToggleButton } from '@rysinal/heroui-vue'
import HeartIcon from './toggle-button-heart-icon.vue'

const isSelected = ref(false)
</script>
