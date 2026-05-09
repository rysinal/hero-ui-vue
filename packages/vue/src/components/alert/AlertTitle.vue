<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_CONTEXT_KEY } from './context'

interface AlertTitleProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<AlertTitleProps>(), {
  as: 'p',
})
const alertContext = inject(ALERT_CONTEXT_KEY, null)
const titleClass = computed(() => composeTwClasses(props.class, alertContext?.slots.title()))
</script>

<template>
  <component :is="props.as" :class="titleClass" data-slot="alert-title">
    <slot />
  </component>
</template>
