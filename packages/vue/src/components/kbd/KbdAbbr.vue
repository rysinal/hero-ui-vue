<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { kbdKeysLabelMap, kbdKeysMap, type KbdKey } from './constants'
import { KBD_CONTEXT_KEY } from './context'

interface KbdAbbrProps {
  class?: string
  /** The keyboard key to display, e.g. "command" renders ⌘. */
  keyValue: KbdKey
}

const props = defineProps<KbdAbbrProps>()
const context = inject(KBD_CONTEXT_KEY, null)
const abbrClass = computed(() => composeTwClasses(props.class, context?.slots.value.abbr()))
const symbol = computed(() => kbdKeysMap[props.keyValue] ?? props.keyValue)
const label = computed(() => kbdKeysLabelMap[props.keyValue] ?? props.keyValue)
</script>

<template>
  <abbr :class="abbrClass" :title="label">{{ symbol }}</abbr>
</template>
