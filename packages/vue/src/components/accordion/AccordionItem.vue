<script setup lang="ts">
import { computed, inject, provide, toRef } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { ACCORDION_CONTEXT_KEY, ACCORDION_ITEM_CONTEXT_KEY } from './context'

interface AccordionItemProps {
  class?: string
  disabled?: boolean
  isDisabled?: boolean
  value: string
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: undefined,
  isDisabled: undefined,
})

const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const expanded = computed(() => accordionContext?.isExpanded(props.value) ?? false)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled ?? accordionContext?.disabled.value)
const itemClass = computed(() => composeTwClasses(props.class, accordionContext?.slots.item()))
const normalizedValue = computed(() => props.value.replace(/[^a-zA-Z0-9_-]/g, '-'))
const triggerId = `accordion-trigger-${normalizedValue.value}`
const panelId = `accordion-panel-${normalizedValue.value}`

provide(ACCORDION_ITEM_CONTEXT_KEY, {
  disabled: finalIsDisabled,
  expanded,
  panelId,
  triggerId,
  value: toRef(props, 'value'),
})
</script>

<template>
  <div
    :class="itemClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-expanded="dataAttr(expanded)"
    :data-hide-separator="dataAttr(accordionContext?.hideSeparator.value)"
    data-slot="accordion-item"
  >
    <slot :is-expanded="expanded" :is-disabled="finalIsDisabled" />
  </div>
</template>
