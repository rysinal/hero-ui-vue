<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CloseButton } from '../close-button'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerCloseTriggerProps {
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<DrawerCloseTriggerProps>(), {
  ariaLabel: 'Close',
})

const context = inject(DRAWER_CONTEXT_KEY, null)
const closeClass = computed(() => composeTwClasses(props.class, context?.slots.value.closeTrigger()))
</script>

<template>
  <CloseButton
    :aria-label="ariaLabel"
    :class="closeClass"
    data-slot="drawer-close-trigger"
    @click.stop="context?.close"
  />
</template>
