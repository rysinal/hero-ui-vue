<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button v-for="radius in radii" :key="radius" :class="radiusClass[radius]" class="shadow-md">
      {{ radius }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@rysinal/heroui-vue'

// React extends buttonVariants with tailwind-variants. In Vue the same result
// comes from composing classes onto the component.
const radii = ['sm', 'md', 'lg', 'full'] as const

const radiusClass: Record<(typeof radii)[number], string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  sm: 'rounded-sm',
}
</script>
