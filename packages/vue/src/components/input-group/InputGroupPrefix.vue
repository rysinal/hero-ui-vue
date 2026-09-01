<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { INPUT_GROUP_CONTEXT_KEY } from './context'

interface InputGroupPrefixProps {
  class?: string
}

const props = defineProps<InputGroupPrefixProps>()
const context = inject(INPUT_GROUP_CONTEXT_KEY, null)

const prefixClass = computed(() => composeTwClasses(props.class, context?.slots.value.prefix()))
</script>

<template>
  <div :class="prefixClass" data-slot="input-group-prefix">
    <slot />
  </div>
</template>
