<script setup lang="ts">
import { computed, provide } from 'vue'
import { linkVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'
import { LINK_CONTEXT_KEY, type LinkContext } from './context'

interface LinkProps {
  as?: string
  href?: string
  target?: string
  rel?: string
  class?: string
}

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'a',
})

const slots = computed(() => linkVariants())

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
    :class="linkClass"
    :href="props.href"
    :rel="props.rel"
    :target="props.target"
  >
    <slot />
  </component>
</template>
