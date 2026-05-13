<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CloseButton } from '../close-button'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalCloseTriggerProps {
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<ModalCloseTriggerProps>(), {
  ariaLabel: 'Close',
})

const context = inject(MODAL_CONTEXT_KEY, null)
const closeClass = computed(() => composeTwClasses(props.class, context?.slots.value.closeTrigger()))
</script>

<template>
  <CloseButton
    :aria-label="ariaLabel"
    :class="closeClass"
    data-slot="modal-close-trigger"
    @click.stop="context?.close"
  />
</template>
