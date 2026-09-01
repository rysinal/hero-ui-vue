<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { POPOVER_CONTEXT_KEY } from './context'

interface PopoverDialogProps {
  class?: string
}

const props = defineProps<PopoverDialogProps>()
const context = inject(POPOVER_CONTEXT_KEY, null)
const dialogClass = computed(() => composeTwClasses(props.class, context?.slots.value.dialog()))
</script>

<template>
  <section :class="dialogClass" data-slot="popover-dialog" role="dialog" tabindex="-1">
    <slot :close="context?.close" />
  </section>
</template>
