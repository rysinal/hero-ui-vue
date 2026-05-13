<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalIconProps {
  class?: string
}

const props = defineProps<ModalIconProps>()
const context = inject(MODAL_CONTEXT_KEY, null)
const iconClass = computed(() => composeTwClasses(props.class, context?.slots.value.icon()))
</script>

<template>
  <div :class="iconClass" data-slot="modal-icon">
    <slot />
  </div>
</template>
