<script setup lang="ts">
import { computed, inject, type ButtonHTMLAttributes } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { PAGINATION_CONTEXT_KEY } from './context'

interface PaginationLinkProps {
  active?: boolean
  as?: string
  class?: string
  disabled?: boolean
  isActive?: boolean
  isDisabled?: boolean
  type?: ButtonHTMLAttributes['type']
}

const props = withDefaults(defineProps<PaginationLinkProps>(), {
  active: undefined,
  as: 'button',
  disabled: undefined,
  isActive: undefined,
  isDisabled: undefined,
  type: 'button',
})

const emit = defineEmits<{
  press: [event: MouseEvent]
}>()

const paginationContext = inject(PAGINATION_CONTEXT_KEY, null)
const isActive = computed(() => props.active ?? props.isActive)
const isDisabled = computed(() => props.disabled ?? props.isDisabled)
const linkClass = computed(() => composeTwClasses(props.class, paginationContext?.slots.value.link()))
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
    :aria-current="isActive ? 'page' : undefined"
    :aria-disabled="dataAttr(isDisabled)"
    :class="linkClass"
    :data-active="dataAttr(isActive)"
    :data-disabled="dataAttr(isDisabled)"
    :disabled="isDisabled"
    :type="props.as === 'button' ? props.type : undefined"
    data-slot="pagination-link"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="onClick"
  >
    <slot />
  </component>
</template>
