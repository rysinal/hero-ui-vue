<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_CONTEXT_KEY } from './context'

interface AlertDescriptionProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<AlertDescriptionProps>(), {
  as: 'span',
})
const alertContext = inject(ALERT_CONTEXT_KEY, null)
const descriptionClass = computed(() =>
  composeTwClasses(props.class, alertContext?.slots.description()),
)
</script>

<template>
  <component :is="props.as" :class="descriptionClass" data-slot="alert-description">
    <slot />
  </component>
</template>
