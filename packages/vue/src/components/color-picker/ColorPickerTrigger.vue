<script setup lang="ts">
import { computed, inject } from 'vue'
import { PopoverTrigger } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { COLOR_PICKER_CONTEXT_KEY } from './context'

interface ColorPickerTriggerProps {
  class?: string
}

const props = defineProps<ColorPickerTriggerProps>()
const context = inject(COLOR_PICKER_CONTEXT_KEY, null)

const triggerClass = computed(() => composeTwClasses(props.class, context?.slots.value.trigger()))
</script>

<template>
  <PopoverTrigger :class="triggerClass" data-slot="color-picker-trigger" type="button">
    <slot :value="context?.value.value" />
  </PopoverTrigger>
</template>
