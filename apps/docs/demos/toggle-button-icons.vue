<script setup lang="ts">
defineProps<{ name: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'left' | 'center' | 'right' }>()
</script>

<template>
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
    <template v-if="name === 'bold'">
      <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
      <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
    </template>
    <template v-else-if="name === 'italic'">
      <path d="M19 4h-9" />
      <path d="M14 20H5" />
      <path d="m15 4-4 16" />
    </template>
    <template v-else-if="name === 'underline'">
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <path d="M4 20h16" />
    </template>
    <template v-else-if="name === 'strikethrough'">
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <path d="M4 12h16" />
    </template>
    <template v-else-if="name === 'left'">
      <path d="M15 12H3" />
      <path d="M17 18H3" />
      <path d="M21 6H3" />
    </template>
    <template v-else-if="name === 'center'">
      <path d="M17 12H7" />
      <path d="M19 18H5" />
      <path d="M21 6H3" />
    </template>
    <template v-else>
      <path d="M21 12H9" />
      <path d="M21 18H7" />
      <path d="M21 6H3" />
    </template>
  </svg>
</template>
