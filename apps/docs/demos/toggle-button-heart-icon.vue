<script setup lang="ts">
defineProps<{ filled?: boolean; name?: 'heart' | 'bookmark' }>()
</script>

<template>
  <svg
    :fill="filled ? 'currentColor' : 'none'"
    stroke="currentColor"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
  >
    <path
      v-if="name === 'bookmark'"
      d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
    />
    <path
      v-else
      d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"
    />
  </svg>
</template>
