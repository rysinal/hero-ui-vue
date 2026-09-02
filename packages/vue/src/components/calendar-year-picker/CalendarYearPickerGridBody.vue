<script setup lang="ts">
import { inject } from 'vue'
import { YEAR_PICKER_GRID_CONTEXT_KEY } from './context'

const grid = inject(YEAR_PICKER_GRID_CONTEXT_KEY, null)
</script>

<template>
  <!-- The caller renders each year, as React does through its child fn. -->
  <slot :years="grid?.years.value ?? []" />
</template>
