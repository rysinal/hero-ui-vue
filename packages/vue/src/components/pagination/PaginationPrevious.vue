<script setup lang="ts">
import { computed, inject, type ButtonHTMLAttributes } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { PAGINATION_CONTEXT_KEY } from './context'

interface PaginationPreviousProps {
  as?: string
  class?: string
  disabled?: boolean
  isDisabled?: boolean
  type?: ButtonHTMLAttributes['type']
}

const props = withDefaults(defineProps<PaginationPreviousProps>(), {
  as: 'button',
  disabled: undefined,
  isDisabled: undefined,
  type: 'button',
})

const emit = defineEmits<{
  press: [event: MouseEvent]
}>()

const paginationContext = inject(PAGINATION_CONTEXT_KEY, null)
const isDisabled = computed(() => props.disabled ?? props.isDisabled)
const previousClass = computed(() => {
  const linkClass = composeTwClasses('pagination__link--nav', paginationContext?.slots.value.link())
  return composeTwClasses(props.class, linkClass)
})
const { interactionAttrs, interactionHandlers } = useInteractionStates(isDisabled)

const onClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }
  emit('press', event)
}
</script>

<template>
  <component
    :is="props.as"
    :aria-disabled="dataAttr(isDisabled)"
    :class="previousClass"
    :data-disabled="dataAttr(isDisabled)"
    :disabled="isDisabled"
    :type="props.as === 'button' ? props.type : undefined"
    data-slot="pagination-previous"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="onClick"
  >
    <slot />
  </component>
</template>
