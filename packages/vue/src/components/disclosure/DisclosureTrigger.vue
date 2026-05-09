<script setup lang="ts">
import { computed, inject, type ButtonHTMLAttributes } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureTriggerProps {
  as?: string
  class?: string
  disabled?: boolean
  isDisabled?: boolean
  type?: ButtonHTMLAttributes['type']
}

const props = withDefaults(defineProps<DisclosureTriggerProps>(), {
  as: 'button',
  disabled: undefined,
  isDisabled: undefined,
  type: 'button',
})

const disclosureContext = inject(DISCLOSURE_CONTEXT_KEY, null)
const isDisabled = computed(() => props.disabled ?? props.isDisabled ?? disclosureContext?.isDisabled.value)
const triggerClass = computed(() =>
  composeTwClasses(props.class, disclosureContext?.slots.value.trigger()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(isDisabled)

const onClick = () => {
  if (isDisabled.value) return
  disclosureContext?.toggle()
}
</script>

<template>
  <component
    :is="props.as"
    :aria-disabled="dataAttr(isDisabled)"
    :aria-expanded="disclosureContext?.isExpanded.value ? 'true' : 'false'"
    :class="triggerClass"
    :data-disabled="dataAttr(isDisabled)"
    :data-expanded="dataAttr(disclosureContext?.isExpanded.value)"
    :disabled="isDisabled"
    :type="props.as === 'button' ? props.type : undefined"
    data-slot="disclosure-trigger"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="onClick"
  >
    <slot :is-expanded="disclosureContext?.isExpanded.value" />
  </component>
</template>
