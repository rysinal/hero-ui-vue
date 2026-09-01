<script setup lang="ts">
/**
 * Renders one row per item. React's Table.Collection exists because its
 * collection API needs an explicit wrapper; in Vue a v-for is usually clearer,
 * so this is kept for parity and for callers coming from the React API.
 */
interface TableCollectionProps<T> {
  items: T[]
}

defineProps<TableCollectionProps<Record<string, unknown>>>()
</script>

<template>
  <slot v-for="(item, index) in items" :key="index" :index="index" :item="item" />
</template>
