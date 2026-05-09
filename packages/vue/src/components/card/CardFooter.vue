<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CARD_CONTEXT_KEY } from './context'

interface CardFooterProps {
  class?: string
}

const props = defineProps<CardFooterProps>()
const cardContext = inject(CARD_CONTEXT_KEY, null)
const footerClass = computed(() => composeTwClasses(props.class, cardContext?.slots.footer()))
</script>

<template>
  <div :class="footerClass" data-slot="card-footer">
    <slot />
  </div>
</template>
