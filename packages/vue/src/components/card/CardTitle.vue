<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CARD_CONTEXT_KEY } from './context'

interface CardTitleProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<CardTitleProps>(), {
  as: 'h3',
})
const cardContext = inject(CARD_CONTEXT_KEY, null)
const titleClass = computed(() => composeTwClasses(props.class, cardContext?.slots.title()))
</script>

<template>
  <component :is="props.as" :class="titleClass" data-slot="card-title">
    <slot />
  </component>
</template>
