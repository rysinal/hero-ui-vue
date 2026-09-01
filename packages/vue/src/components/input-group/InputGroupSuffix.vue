<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { INPUT_GROUP_CONTEXT_KEY } from './context'

interface InputGroupSuffixProps {
  class?: string
}

const props = defineProps<InputGroupSuffixProps>()
const context = inject(INPUT_GROUP_CONTEXT_KEY, null)

const suffixClass = computed(() => composeTwClasses(props.class, context?.slots.value.suffix()))
</script>

<template>
  <div :class="suffixClass" data-slot="input-group-suffix">
    <slot />
  </div>
</template>
