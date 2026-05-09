<script setup lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { BREADCRUMBS_CONTEXT_KEY } from './context'

interface BreadcrumbsItemProps {
  class?: string
  href?: string
  isCurrent?: boolean
  isDisabled?: boolean
  rel?: string
  target?: string
}

const props = withDefaults(defineProps<BreadcrumbsItemProps>(), {
  isCurrent: undefined,
  isDisabled: undefined,
})

const breadcrumbsContext = inject(BREADCRUMBS_CONTEXT_KEY, null)
const isCurrentPage = computed(() => props.isCurrent ?? !props.href)
const finalIsDisabled = computed(() => props.isDisabled ?? breadcrumbsContext?.isDisabled.value)
const itemClass = computed(() => composeTwClasses(props.class, breadcrumbsContext?.slots.item()))
const linkClass = computed(() => breadcrumbsContext?.slots.link())
const separatorClass = computed(() => breadcrumbsContext?.slots.separator())
const linkTag = computed(() => (props.href && !isCurrentPage.value ? 'a' : 'span'))
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

const SeparatorSlot = defineComponent({
  name: 'BreadcrumbsSeparatorSlot',
  setup() {
    return () => breadcrumbsContext?.separatorSlot?.() ?? null
  },
})

const handleClick = (event: MouseEvent) => {
  if (!finalIsDisabled.value) return
  event.preventDefault()
  event.stopPropagation()
}
</script>

<template>
  <li :class="itemClass" data-slot="breadcrumbs-item">
    <component
      :is="linkTag"
      :class="linkClass"
      :href="linkTag === 'a' && !finalIsDisabled ? href : undefined"
      :aria-current="isCurrentPage ? 'page' : undefined"
      :aria-disabled="dataAttr(finalIsDisabled)"
      :data-current="dataAttr(isCurrentPage)"
      :data-disabled="dataAttr(finalIsDisabled)"
      :rel="rel"
      :target="target"
      data-slot="breadcrumbs-link"
      v-bind="interactionAttrs"
      v-on="interactionHandlers"
      @click="handleClick"
    >
      <slot />
    </component>
    <span v-if="!isCurrentPage" :class="separatorClass" aria-hidden="true" data-slot="breadcrumbs-separator">
      <SeparatorSlot v-if="breadcrumbsContext?.separatorSlot" />
      <svg
        v-else-if="breadcrumbsContext?.separator.value === 'chevron'"
        fill="none"
        height="1em"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="1em"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
      <span v-else>/</span>
    </span>
  </li>
</template>
