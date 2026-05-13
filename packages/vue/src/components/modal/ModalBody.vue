<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalBodyProps {
  class?: string
}

const props = defineProps<ModalBodyProps>()
const context = inject(MODAL_CONTEXT_KEY, null)
const bodyClass = computed(() => composeTwClasses(props.class, context?.slots.value.body()))
</script>

<template>
  <div :class="bodyClass" data-slot="modal-body">
    <slot />
  </div>
</template>
