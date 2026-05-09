<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ACCORDION_CONTEXT_KEY } from './context'

interface AccordionBodyProps {
  class?: string
}

const props = defineProps<AccordionBodyProps>()
const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const bodyClass = computed(() => composeTwClasses(props.class, accordionContext?.slots.body()))
const bodyInnerClass = computed(() => accordionContext?.slots.bodyInner())
</script>

<template>
  <div :class="bodyClass" data-slot="accordion-body">
    <div :class="bodyInnerClass" data-slot="accordion-body-inner">
      <slot />
    </div>
  </div>
</template>
