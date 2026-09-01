<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { COLOR_INPUT_GROUP_KEY } from './context'

interface ColorInputGroupSuffixProps {
  class?: string
}

const props = defineProps<ColorInputGroupSuffixProps>()
const group = inject(COLOR_INPUT_GROUP_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, group?.slots.value.suffix()))
</script>

<template>
  <span :class="elementClass" data-slot="color-input-group-suffix">
    <slot />
  </span>
</template>
