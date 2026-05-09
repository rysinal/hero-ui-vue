<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { BADGE_CONTEXT_KEY } from './context'

interface BadgeLabelProps {
  class?: string
}

const props = defineProps<BadgeLabelProps>()
const badgeContext = inject(BADGE_CONTEXT_KEY, null)
const labelClass = computed(() => composeTwClasses(props.class, badgeContext?.slots.label()))
</script>

<template>
  <span :class="labelClass" data-slot="badge-label">
    <slot />
  </span>
</template>
