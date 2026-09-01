<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useId } from 'vue'
import { composeTwClasses } from '../../utils'
import { POPOVER_CONTEXT_KEY } from './context'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface PopoverHeadingProps {
  as?: string
  class?: string
  id?: string
  level?: HeadingLevel
}

const props = withDefaults(defineProps<PopoverHeadingProps>(), {
  as: undefined,
  level: 3,
})

const context = inject(POPOVER_CONTEXT_KEY, null)
const headingTag = computed(() => props.as ?? `h${props.level}`)
const headingClass = computed(() => composeTwClasses(props.class, context?.slots.value.heading()))

// Register the id so the dialog can point aria-labelledby at this heading.
const generatedId = `heroui-popover-heading-${useId()}`
const headingId = computed(() => props.id ?? generatedId)

context?.registerHeadingId(headingId.value)

onBeforeUnmount(() => {
  context?.unregisterHeadingId(headingId.value)
})
</script>

<template>
  <component
    :is="headingTag"
    :id="headingId"
    :class="headingClass"
    data-slot="popover-heading"
  >
    <slot />
  </component>
</template>
