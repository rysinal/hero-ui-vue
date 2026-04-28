<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { LINK_CONTEXT_KEY, type LinkContext } from './context'
import ExternalLinkIcon from '../icons/ExternalLinkIcon.vue'

interface LinkIconProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<LinkIconProps>(), {
  as: 'span',
})

const slots = defineSlots<{
  default?: () => any
}>()

const linkContext = inject<LinkContext>(LINK_CONTEXT_KEY, {})

const iconClass = computed(() => {
  return composeTwClasses(props.class, linkContext.slots?.icon())
})

const hasDefaultIcon = computed(() => !slots.default)
</script>

<template>
  <component
    :is="as"
    :class="iconClass"
    :data-default-icon="dataAttr(hasDefaultIcon)"
    data-slot="link-icon"
  >
    <slot>
      <ExternalLinkIcon data-slot="link-default-icon" />
    </slot>
  </component>
</template>
