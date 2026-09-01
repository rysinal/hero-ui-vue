<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { KBD_CONTEXT_KEY } from './context'

interface KbdContentProps {
  class?: string
}

const props = defineProps<KbdContentProps>()
const context = inject(KBD_CONTEXT_KEY, null)
const contentClass = computed(() => composeTwClasses(props.class, context?.slots.value.content()))
</script>

<template>
  <span :class="contentClass">
    <slot />
  </span>
</template>
