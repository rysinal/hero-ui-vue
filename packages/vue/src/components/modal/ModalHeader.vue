<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalHeaderProps {
  class?: string
}

const props = defineProps<ModalHeaderProps>()
const context = inject(MODAL_CONTEXT_KEY, null)
const headerClass = computed(() => composeTwClasses(props.class, context?.slots.value.header()))
</script>

<template>
  <div :class="headerClass" data-slot="modal-header">
    <slot />
  </div>
</template>
