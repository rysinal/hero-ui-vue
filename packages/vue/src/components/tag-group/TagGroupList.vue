<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TAG_GROUP_CONTEXT_KEY } from './context'

interface TagGroupListProps {
  class?: string
}

const props = defineProps<TagGroupListProps>()
const context = inject(TAG_GROUP_CONTEXT_KEY, null)

const listClass = computed(() => composeTwClasses(props.class, context?.slots.value.list()))
const selectionMode = computed(() => context?.selectionMode.value ?? 'none')
</script>

<template>
  <div
    :aria-multiselectable="selectionMode === 'multiple' ? 'true' : undefined"
    :class="listClass"
    :role="selectionMode === 'none' ? undefined : 'listbox'"
    data-slot="tag-group-list"
  >
    <slot />
  </div>
</template>
