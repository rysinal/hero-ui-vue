<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TAG_CONTEXT_KEY } from './context'

interface TagRemoveButtonProps {
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<TagRemoveButtonProps>(), {
  ariaLabel: 'Remove',
})

const tagContext = inject(TAG_CONTEXT_KEY, null)
const removeButtonClass = computed(() =>
  composeTwClasses(props.class, tagContext?.slots.removeButton()),
)

const handleClick = () => {
  tagContext?.remove?.()
}
</script>

<template>
  <button
    :aria-label="props.ariaLabel"
    :class="removeButtonClass"
    data-slot="tag-remove-button"
    type="button"
    @click.stop="handleClick"
  >
    <slot>
      <svg aria-hidden="true" fill="none" height="1em" viewBox="0 0 24 24" width="1em">
        <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
      </svg>
    </slot>
  </button>
</template>
