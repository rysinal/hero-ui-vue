<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { SEARCH_FIELD_CONTEXT_KEY } from './context'

interface SearchFieldGroupProps {
  class?: string
}

const props = defineProps<SearchFieldGroupProps>()
const searchFieldContext = inject(SEARCH_FIELD_CONTEXT_KEY, null)
const groupClass = computed(() =>
  composeTwClasses(props.class, searchFieldContext?.slots.value.group()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(
  () => searchFieldContext?.isDisabled.value,
)
</script>

<template>
  <div
    :aria-disabled="dataAttr(searchFieldContext?.isDisabled.value)"
    :class="groupClass"
    :data-disabled="dataAttr(searchFieldContext?.isDisabled.value)"
    :data-focus-within="dataAttr(searchFieldContext?.isFocused.value)"
    :data-invalid="dataAttr(searchFieldContext?.isInvalid.value)"
    data-slot="search-field-group"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
  >
    <slot />
  </div>
</template>
