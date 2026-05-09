<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CARD_CONTEXT_KEY } from './context'

interface CardDescriptionProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<CardDescriptionProps>(), {
  as: 'p',
})
const cardContext = inject(CARD_CONTEXT_KEY, null)
const descriptionClass = computed(() =>
  composeTwClasses(props.class, cardContext?.slots.description()),
)
</script>

<template>
  <component :is="props.as" :class="descriptionClass" data-slot="card-description">
    <slot />
  </component>
</template>
