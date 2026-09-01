<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useId } from 'vue'
import { composeTwClasses } from '../../utils'
import { MODAL_CONTEXT_KEY } from './context'

interface ModalHeadingProps {
  as?: string
  class?: string
  id?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const props = withDefaults(defineProps<ModalHeadingProps>(), {
  level: 3,
})

const context = inject(MODAL_CONTEXT_KEY, null)
const headingClass = computed(() => composeTwClasses(props.class, context?.slots.value.heading()))
const headingElement = computed(() => props.as ?? `h${props.level}`)

// Register the id so the dialog can point aria-labelledby at this heading.
const generatedId = `heroui-modal-heading-${useId()}`
const headingId = computed(() => props.id ?? generatedId)

context?.registerHeadingId(headingId.value)

onBeforeUnmount(() => {
  context?.unregisterHeadingId(headingId.value)
})
</script>

<template>
  <component
    :is="headingElement"
    :id="headingId"
    :class="headingClass"
    data-slot="modal-heading"
  >
    <slot />
  </component>
</template>
