<script setup lang="ts">
/* global Element, MouseEvent */
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalDialogProps {
  class?: string
}

const props = defineProps<ModalDialogProps>()
const context = inject(MODAL_CONTEXT_KEY, null)
const dialogClass = computed(() => composeTwClasses(props.class, context?.slots.value.dialog()))

const handleClick = (event: MouseEvent) => {
  const target = event.target instanceof Element ? event.target : null
  if (!target?.closest('[slot="close"], [data-modal-close="true"]')) return
  context?.close()
}
</script>

<template>
  <section
    :aria-labelledby="context?.headingId.value"
    :class="dialogClass"
    :data-placement="context?.placement.value"
    aria-modal="true"
    data-slot="modal-dialog"
    role="dialog"
    tabindex="-1"
    @click.capture="handleClick"
  >
    <slot :close="context?.close" />
  </section>
</template>
