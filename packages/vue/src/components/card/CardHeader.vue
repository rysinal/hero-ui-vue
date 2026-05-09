<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CARD_CONTEXT_KEY } from './context'

interface CardHeaderProps {
  class?: string
}

const props = defineProps<CardHeaderProps>()
const cardContext = inject(CARD_CONTEXT_KEY, null)
const headerClass = computed(() => composeTwClasses(props.class, cardContext?.slots.header()))
</script>

<template>
  <div :class="headerClass" data-slot="card-header">
    <slot />
  </div>
</template>
