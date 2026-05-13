<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalFooterProps {
  class?: string
}

const props = defineProps<ModalFooterProps>()
const context = inject(MODAL_CONTEXT_KEY, null)
const footerClass = computed(() => composeTwClasses(props.class, context?.slots.value.footer()))
</script>

<template>
  <div :class="footerClass" data-slot="modal-footer">
    <slot :close="context?.close" />
  </div>
</template>
