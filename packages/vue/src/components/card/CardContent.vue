<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CARD_CONTEXT_KEY } from './context'

interface CardContentProps {
  class?: string
}

const props = defineProps<CardContentProps>()
const cardContext = inject(CARD_CONTEXT_KEY, null)
const contentClass = computed(() => composeTwClasses(props.class, cardContext?.slots.content()))
</script>

<template>
  <div :class="contentClass" data-slot="card-content">
    <slot />
  </div>
</template>
