<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DATE_INPUT_GROUP_KEY } from './context'

interface DateInputGroupPrefixProps {
  class?: string
}

const props = defineProps<DateInputGroupPrefixProps>()
const context = inject(DATE_INPUT_GROUP_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.prefix()))
</script>

<template>
  <span :class="elementClass" data-slot="date-input-group-prefix">
    <slot />
  </span>
</template>
