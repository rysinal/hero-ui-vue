<script setup lang="ts">
/* global MouseEvent */
import { computed, provide } from 'vue'
import { linkVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { LINK_CONTEXT_KEY, type LinkContext } from './context'

interface LinkProps {
  as?: string
  href?: string
  target?: string
  rel?: string
  class?: string
  isDisabled?: boolean
  /** Marks this link as the current page, exposed as aria-current and data-current. */
  isCurrent?: boolean
  download?: boolean | string
  hrefLang?: string
  ping?: string
  referrerPolicy?: string
}

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'a',
  download: undefined,
  isCurrent: undefined,
  isDisabled: undefined,
})

// A disabled link must not navigate; an anchor has no disabled attribute.
const handleClick = (event: MouseEvent) => {
  if (props.isDisabled) event.preventDefault()
}

const slots = computed(() => linkVariants())
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => props.isDisabled)

provide<LinkContext>(LINK_CONTEXT_KEY, {
  slots: slots.value,
})

const linkClass = computed(() => {
  return composeTwClasses(props.class, slots.value?.base())
})
</script>

<template>
  <component
    :is="props.as"
    :aria-current="props.isCurrent ? 'page' : undefined"
    :aria-disabled="dataAttr(props.isDisabled)"
    :class="linkClass"
    :data-current="dataAttr(props.isCurrent)"
    :data-disabled="dataAttr(props.isDisabled)"
    :download="props.download"
    :href="props.isDisabled ? undefined : props.href"
    :hreflang="props.hrefLang"
    :ping="props.ping"
    :referrerpolicy="props.referrerPolicy"
    :rel="props.rel"
    :tabindex="props.isDisabled ? -1 : undefined"
    :target="props.target"
    data-slot="link"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
